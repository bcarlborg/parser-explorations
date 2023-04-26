import type { Grammar, GrammarRuleLeftHandSide, GrammarRuleRightHandSide } from '../grammar-types';
import { generateKPartitionsOverSequence } from '../../../utilities/k-partitions-over-sequence'

type ParseTreeNode<NonTerminal, Terminal> = ParseTreeInteriorNode<NonTerminal, Terminal> | ParseTreeLeafNode<Terminal>

type ParseTreeInteriorNode<NonTerminal, Terminal> = {
    nonTerminal: NonTerminal,
    children: ParseTreeNode<NonTerminal, Terminal>[];
}

type ParseTreeLeafNode<Terminal> = {
    terminal: Terminal
}

export function ungerParseECNFGrammar<
    NonTerminal extends string,
    Terminal extends string
>(
    grammar: Grammar<NonTerminal, Terminal>,
    inputString: string,
) {
    const data = ungerParseECNFGrammarSymbol(grammar, inputString, grammar.startSymbol, 0, inputString.length - 1);
    return data
}

export function ungerParseECNFGrammarSymbol<
    NonTerminal extends string,
    Terminal extends string
>(
    grammar: Grammar<NonTerminal, Terminal>,
    inputString: string,
    symbol: NonTerminal,
    inputStartIndex: number,
    inputEndIndex: number,
): ParseTreeNode<NonTerminal, Terminal>[] {
    // we start by getting all the productions for this symbol
    const productions = grammar.rules[symbol];

    const validChildren: ParseTreeNode<NonTerminal, Terminal>[][] = [];

    productions.forEach(production => {
        const validChildrenForThisProduction = ungerParseECNFGrammarProduction(grammar, inputString, production, inputStartIndex, inputEndIndex);
        validChildren.push(...validChildrenForThisProduction);
    });

    return validChildren.map((validChilds) => ({
        nonTerminal: symbol,
        children: validChilds,
    }));
}

export function ungerParseECNFGrammarProduction<
    NonTerminal extends string,
    Terminal extends string
>(
    grammar: Grammar<NonTerminal, Terminal>,
    inputString: string,
    production: GrammarRuleRightHandSide<NonTerminal, Terminal>,
    inputStartIndex: number,
    inputEndIndex: number,
): ParseTreeNode<NonTerminal, Terminal>[][] {
    // in the base case, this production generates a terminal
    // in this case we can simply check that the terminal matches the character
    // at the specified input index
    if ('terminal' in production) {
        const subString = inputString.substring(inputStartIndex, inputEndIndex + 1);
        const terminal = production['terminal'];

        // if the terminal and substring equal, then we can return this leaf node
        // as the set of all possible parses for this production over this input
        // otherwise, return an empty array
        if (terminal === subString) return [[{ terminal }]]

        return [];
    }

    // if this production has a single nonTerminal as its production
    // then we will generate all parses for that one nonterminal over the same subset of the input
    if ('nonTerminal1' in production && !('nonTerminal2' in production)) {
        const nonTerminal = production['nonTerminal1'];

        const parsesTrees = ungerParseECNFGrammarSymbol(grammar, inputString, nonTerminal, inputStartIndex, inputEndIndex);

        const validChildren = parsesTrees.map((tree) => ({
            nonTerminal,
            children: [tree],
        }));

        if (validChildren.length === 0) return [];

        return [validChildren];
    }

    // if this production has two nonTerminals in its production
    // then we will have to generate parse trees for all paritions of the input substring
    // over those two non terminals
    if ('nonTerminal1' in production && 'nonTerminal2' in production) {
        const nonTerminal1 = production['nonTerminal1'];
        const nonTerminal2 = production['nonTerminal2'];

        const validChildren: ParseTreeNode<NonTerminal, Terminal>[][] = [];

        // we will generate an array of partitions for 2 variables
        // [
        //   [ [a,b], [c,d] ] // partition assignment 1
        //   [ [e,f], [g,h] ] // partition assignment 2
        //   ...
        // ]
        const stringPartitionsForTwoVariables = generateKPartitionsOverSequence(2, inputStartIndex, inputEndIndex);

        stringPartitionsForTwoVariables.forEach(partitionAssignment => {
            const nonTerminal1Partition = partitionAssignment[0];
            const nonTerminal2Partition = partitionAssignment[1];

            // get all the parse trees for these assignments
            const nonTerminal1Parses = ungerParseECNFGrammarSymbol(
                grammar, inputString, nonTerminal1, nonTerminal1Partition[0], nonTerminal1Partition[1]
            );

            if (nonTerminal1Parses.length === 0) return

            const nonTerminal2Parses = ungerParseECNFGrammarSymbol(
                grammar, inputString, nonTerminal2, nonTerminal2Partition[0], nonTerminal2Partition[1]
            );
            
            if (nonTerminal2Parses.length === 0) return

            const validChildrenForThisPartition = nonTerminal1Parses.flatMap(nonTerminal1Parse => 
                nonTerminal2Parses.map(nonTerminal2Parse => ([
                    nonTerminal1Parse,
                    nonTerminal2Parse
                ]))
            );

            validChildren.push(...validChildrenForThisPartition);
        });

        return validChildren;
    }

    return [];
}
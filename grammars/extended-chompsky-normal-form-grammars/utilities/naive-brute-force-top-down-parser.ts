import type {Grammar, GrammarRule, GrammarRuleRightHandSides, GrammarRuleRightHandSide } from '../grammar-types';

/**
 * For myself when I return
 * I am currently in the process of implementing the recursive parse node function
 * I think I have written the base case correctly when we are parsing terminals and returning
 * External parse nodes.... for the recursive case though... I still have questions.
 * - How can we be sure we won't recurse infinitely is the main one to be hoenst
 * - Need to think about the shape of the different internal productions we could be evaluating
 * - Need to come up with a type for the internal parse nodes
 */

type InteriorParseNode<
    NonTerminals extends string,
    Terminals extends string
> = {terminal: Terminals}
| { nonTerminal1: NonTerminals}
| { nonTerminal1: NonTerminals, nonTerminal2: NonTerminals};

type ExteriorParseNode<
    Terminals extends string
> = {
    terminal: Terminals
    inputStartIndex: number
    inputEndIndex: number
}

export function naiveBruteForceTopDownParser<
    NonTerminals extends string,
    Terminals extends string
>(grammar: Grammar<NonTerminals, Terminals>, input: string) {
    
}

function parseProductionForInputString<
    NonTerminals extends string,
    Terminals extends string
>(grammar: Grammar<NonTerminals, Terminals>, production: GrammarRuleRightHandSide<NonTerminals, Terminals>, input: string, inputStartIndex: number, inputEndIndex: number) {
    const inputSubString = input.substring(inputStartIndex, inputEndIndex + 1);

    // base case: the production is a single terminal
    // in this case we simply check that the whole input matches that terminal
    if ('terminal' in production) {
        const productionTerminal = production['terminal'];

        // If the terminal in the production, and the subset of the input we are currently
        // evaluating match, then we will return an exterior parse node, otherwise, we will
        // return false
        return productionTerminal === inputSubString 
            ? {terminal: productionTerminal, inputStartIndex, inputEndIndex}
            : false;
    }

    if ('nonTerminal1' in production && !('nonTerminal2' in production)) {
        // try each production with each substring.
        // how you can easily imagine an infinite loop here. I guess this is why we don't
        // allow left recurssion.
    }

    if ('nonTerminal1' in production && 'nonTerminal2' in production) {
        // try each production with each substring? Need to visualize this a bit
    }
}
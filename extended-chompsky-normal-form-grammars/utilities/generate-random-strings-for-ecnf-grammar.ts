import type {Grammar, GrammarRuleRightHandSides, GrammarRuleRightHandSide } from '../grammar-types';


//
// This function will generate $number of random strings that are valid
// in the language of $grammar. It does so by tranvsersing the grammar's
// productions from the start string and choosing random valid productions along the way
//
export function generateRandomStringsForECNFGrammar<
    NonTerminals extends string,
    Terminals extends string
>(grammar: Grammar<NonTerminals, Terminals>, numberOfStrings: number) {
    for (let i = 0; i < 100; i++) {
        const generatedString = generateRandomProductions(grammar, grammar.rules[grammar.startSymbol], '');
        console.log(generatedString);
    }
}

//
// A recursive function that takes multiple productions and will generate
// strings for each production by calling generateRandomProduction()
//
function generateRandomProductions<
    NonTerminals extends string,
    Terminals extends string
>(
    grammar: Grammar<NonTerminals, Terminals>,
    productions: GrammarRuleRightHandSides<NonTerminals, Terminals>,
    generatedString: string
): string {
    // if there is only one production in the array of productions,
    // generate a string for that production
    if (productions.length === 1) {
       return generateRandomProduction(grammar, productions[0], generatedString);
    }

    //
    // otherwise, there are multiple productions, and we will choose one at random to run
    //

    const randomProductionIndex = Math.floor(Math.random() * productions.length);
    const production = productions?.[randomProductionIndex];
    if (production === null) {
        console.error(`Attempted to access ${randomProductionIndex} index of an array only containing ${productions.length} elements`)
        throw new Error('oh shit');
    }

    return generateRandomProduction(grammar, production, generatedString);
}

//
// A recursive function that will generate a random string that is valid for a specific production
//
function generateRandomProduction<
    NonTerminals extends string,
    Terminals extends string
>(
    grammar: Grammar<NonTerminals, Terminals>,
    currentProduction: GrammarRuleRightHandSide<NonTerminals, Terminals>,
    generatedString: string
): string {
    // then we have a terminal we can produce! lets produce it baby!
    if ('terminal' in currentProduction) {
        return generatedString + currentProduction.terminal;
    }

    if ('nonTerminal1' in currentProduction && !('nonTerminal2' in currentProduction)) {
        return generateRandomProductions(grammar, grammar.rules[currentProduction.nonTerminal1], generatedString);
    }

    // at this point, we know that the production has two non terminals in it
    const extendedString = generateRandomProductions(grammar, grammar.rules[currentProduction.nonTerminal1], generatedString);
    return generateRandomProductions(grammar, grammar.rules[currentProduction.nonTerminal2], extendedString);
}

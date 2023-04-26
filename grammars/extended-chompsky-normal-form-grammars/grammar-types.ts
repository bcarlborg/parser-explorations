/**
 * These types allow you to represent Extended Chomsky Normal Form
 * context free grammars in TS. The way these types are structured will ensure that
 * 1. every NonTerminal is used in the left hand side of a grammar production
 * 2. the Start Symbol of the grammar is a Non Terminal in the grammar
 * 3. all productions are in one of the following forms (A,B,C are some non-Terminal, x is some terminal)
 *    - A -> B
 *    - A -> BC
 *    - A -> x
 * 
 * You may wonder...
 * What is "extended" chompsky normal form? Well it is a grammar form I made up.
 * It is the same as chompsky normal form with the following exceptions
 * 1. unlinke true chompsky normal form grammars, this grammar type does not require the
 *    start symbol to only appear on the left hand side of one production
 * 2. unlike true chompsky normal form grammars, this grammar type allows production rules
 *    in the form A -> B where A and B are non terminal symbols
 * 
 * See ./eample-grammars for some grammars implemented in this style
 */

export type GrammarRuleLeftHandSide<
    NonTerminal extends string
> = NonTerminal;

export type GrammarRuleRightHandSide<
    NonTerminal extends string,
    Terminal extends string
> = {terminal: Terminal}
| { nonTerminal1: NonTerminal}
| { nonTerminal1: NonTerminal, nonTerminal2: NonTerminal};

export type GrammarRuleRightHandSides<
    NonTerminal extends string,
    Terminal extends string
> = GrammarRuleRightHandSide<NonTerminal, Terminal>[];

export type GrammarRules<
    NonTerminal extends string,
    Terminal extends string
> = Record<NonTerminal, GrammarRuleRightHandSides<NonTerminal, Terminal>>;

export interface Grammar<
    NonTerminal extends string,
    Terminal extends string
> {
    startSymbol: NonTerminal;
    rules: GrammarRules<NonTerminal, Terminal>;
}

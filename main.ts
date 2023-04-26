import { getRandomValues } from 'crypto';
import { BON_GRAMMAR } from './grammars/extended-chompsky-normal-form-grammars/example-grammars/beaus-object-notation';
import {generateRandomStringsForECNFGrammar} from './grammars/extended-chompsky-normal-form-grammars/utilities/generate-random-strings-for-ecnf-grammar';
import {ungerParseECNFGrammar} from './grammars/extended-chompsky-normal-form-grammars/utilities/unger-parser-for-ecnf-grammar';

generateRandomStringsForECNFGrammar(BON_GRAMMAR, 10);

const inputString = '[9,456,"foobar"]';
ungerParseECNFGrammar(BON_GRAMMAR, inputString);
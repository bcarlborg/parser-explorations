import { BON_GRAMMAR } from './extended-chompsky-normal-form-grammars/example-grammars/beaus-object-notation';
import { generateRandomStringsForECNFGrammar } from './extended-chompsky-normal-form-grammars/utilities/generate-random-strings-for-ecnf-grammar';

generateRandomStringsForECNFGrammar(BON_GRAMMAR, 100);
# Parsers Exploration

Hello! This is a repository where I will be writing some code to explore how parsers work and can be implemented. Generally speaking, the code in this repository allows for writing formal grammars as values in a typescript file and doing things with those grammars (parsing strings in the language of those grammars, generating stings in those grammars, etc).

As time goes on, this repository may take on a more intentional purpose, but for now it is mainly exploratory in nature.

## Project structure

This work is still very early on, so there is not any official structure yet. At the time of writing, the project has a directory called `grammars/` which contains different grammar types. Within those directories, you should be able to find example grammars in those structures, and a few utilities to do interesting things with those grammars.

## Usage

At a minumum, there should always be a `main.ts` file in the root directory. To run the file you will need `tsc` (the typescript compiler) as well as `node` installed on your machine.

With those two tools installed you should be able to run the following

```Bash
# switch into this project's directory
cd parser-explorations

# use the typescript compiler to generate javascript files
# for this project
tsc --build

# run the main file
node main.js

# cleanup the generate js files when you are done
tsc --build --clean
```

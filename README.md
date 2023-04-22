# Parsers Exploration

Hello! This is a repository where I will be writing some code to explore how parsers work and can be implemented. Generally speaking, the code in this repository allows for writing formal grammars as values in a typescript file and doing things with those grammars (parsing strings in the language of those grammars, generating stings in those grammars, etc).

As time goes on, this repository may take on a more intentional purpose, but for now it is mainly exploratory in nature.

## Project structure

This work is still very early on, so there is not any official structure yet. At the time of writing, the project has a directory called `grammars/` which contains different grammar types. Within those directories, you should be able to find example grammars in those structures, and a few utilities to do interesting things with those grammars.

## Project Dependencies

This project has relatively few dependencies for the time being. I have listed those a user should have installed below. I also include the versions of the software that I am currently running. I suspect that most close-ish versions to these listed below will work. So, if you wish to use a different version, things will probably be fine; but, I make no guarantees.

**Essential dependencies:**

- `node v8.14.2`: the runtime for executing the compiled javascript files on your machine. Node can be downloaded and insalled [here](https://nodejs.org/en/download).
- `tsc Version 5.0.4`: the typescript compiler -- you can use this to compile (transpile?) the typescript code into js files to run. tsc can be downloaded and installed [here](https://www.typescriptlang.org/download).

**NonEssential dependencies:**

- `Visual Studio Code version 1.77`: you can use whatever editor you want for this project. I am using VsCode because it has great out of the box support for most languages and it has a good vim emulator support.
  - I am sure other editors will work just as well for this project. Whatever you choose to use, I would reccomend setting up support for the typescript language server for this project in your workspace. See [langserver.org](https://langserver.org/) for more information.

## Usage

With essential dependencies above installed you should be able to run the following

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

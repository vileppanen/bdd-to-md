# bdd-to-md

This cli tool scans specifed folder for BDD feature spec files, written in Gherkin, and generates a markdown file out of them.

## Dependencies

The package defines `gherkin` as a peer-dependency, so you need to install it separately in your project.

## Install

The package is published in Github packages. Follow the instructions in Github to authenticate yourself to GH packages & how to install the package from there.

## Usage

Provide the generator command with a path containing the feature spec files, and the desired output filepath for the generated markdown.

Example:

```bash
bdd-to-md --featuresPath features --markdownFilePath FEATURES.md
```

or, by using aliases in arguments

```bash
bdd-to-md -f features -m FEATURES.md
```

# bdd-to-md

This cli tool scans specifed folder for BDD feature spec files, written in Gherkin, and generates a markdown file out of them.

## Dependencies

The package defines `gherkin` as a peer-dependency, so you need to install it separately in your project.

## Usage

Provide the generator command with a path containing the feature spec files, and the desired output filepath for the generated markdown.

Example:

```bash
bdd-to-md --featuresPath features --markdownFilePath FEATURES.md
```

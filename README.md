# bdd-to-md

This cli tool scans specifed folder for BDD feature spec files, written in Gherkin, converts them to another format, and outputs the converted data into a specified file.

## Dependencies

The package defines `gherkin` as a peer-dependency, so you need to install it separately in your project.

## Install

The package is published in Github packages. Follow the instructions in Github to authenticate yourself to GH packages & how to install the package from there.

## Usage

Provide the generator command with a path containing the feature spec files, and the desired output filepath for the generated data.

Example:

```bash
bdd-to-md --featuresPath features --outputFilePath FEATURES.md
```

or, by using aliases in arguments

```bash
bdd-to-md -f features -o FEATURES.md
```

Example, using custom conversion type:


```bash
bdd-to-md --featuresPath features --outputFilePath plain.txt --conversionType my-custom-conversion-type
```

or, by using aliases in arguments

```bash
bdd-to-md -f features -o plain.txt -c my-custom-conversion-type
```

## Development

Despite the project name stating sole capability of converting BDD to MD, the project structure allows to extend the capabilities to custom formats too. If you fork the repo, and want to add more conversion capabilities, you can add your custom converters as follows:

1. add new conversion producer module in folder `generate-docs/convert/producers`
2. export a public function named `produceFrom` from the producer module
3. have the function accept a `gherkinDocument` (see https://github.com/cucumber/common/tree/main/gherkin) as an argument
4. export the new conversion producer module in the `generate-docs/convert/producers/index.js`
5. use the producer by providing the exported key name in the `conversionType` cli argument

When in doubt, take a look in the `generate-docs/convert/producers` directory, how the `md` producer is implemented and exported in the producers module.

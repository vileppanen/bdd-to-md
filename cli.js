#!/usr/bin/env node

const path = require('path')
const commandLineArgs = require('command-line-args')
const { generateMarkdown } = require('./generate-docs')

const optionDefinitions = [
  { name: 'featuresPath', alias: 'f', type: String },
  { name: 'markdownFilePath', alias: 'm', type: String }
]

const options = commandLineArgs(optionDefinitions)

if (!options.featuresPath) throw new Error('featuresPath argument not provided')
if (!options.markdownFilePath) throw new Error('markdownFilePath argument not provided')

const featuresPath = path.join(options.featuresPath)
const mdFilePath = path.join(options.markdownFilePath)

generateMarkdown(featuresPath, mdFilePath)

#!/usr/bin/env node

const { getFeaturesPath, getMarkDownFilePath } = require('./command-line-args')
const { generateMarkdown } = require('./generate-docs')

const featuresPath = getFeaturesPath()
const mdFilePath = getMarkDownFilePath()

generateMarkdown(featuresPath, mdFilePath)

import Util from "../util.js"

const componentNameAnchor = '$$componentName'

const serviceNameAnchor = '$$serviceName'
const repositoryAnchor = '$$repositoryName'

const serviceNameDepAnchor = '$$serviceNameDep'
const repositoryNameDepAnchor = '$$repositoryNameDep'

const template = `
import $$serviceName from '../service/$$serviceNameDep.js
import $$repositoryName from '../service/$$repositoryNameDep.js

export default class $$componentNameFactory {
  static getInstance() {
    const repository = new $$repositoryName()
    const service = new $$serviceName({ repository })
    return service
  }
}`

export function factoryTemplate(componentName, repositoryName, serviceName) {
  const txtFile = template
    .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))

    .replaceAll(serviceNameDepAnchor, Util.lowerCaseFirstLetter(serviceName))
    .replaceAll(repositoryNameDepAnchor, Util.lowerCaseFirstLetter(repositoryName))

    .replaceAll(serviceNameAnchor, Util.upperCaseFirstLetter(serviceName))
    .replaceAll(repositoryAnchor, Util.upperCaseFirstLetter(repositoryName))

  return {
    fileName: `${componentName}Factory`,
    template: txtFile
  }
}
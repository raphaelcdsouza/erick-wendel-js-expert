// O objetivo do Fluent API é executar tarefas
// como um pipeline, step by step
// e no fim, chama o build. MUITO similar ao padrão Builder
// a diferença que aqui é sobre processos, o Builder sobre construção
// de objetos
class TextProcessorFluentAPI {
  // propriedade privada!
  #content

  constructor(content) {
    this.#content = content
  }

  extractPeopleData() {
    // ?<= fala que vai extrair os dados que virão depois desse grupo
    // [contrantante|contratado] ou um ou outro, (e tem a flag no fim da expressão pra pegar maiusculo e minusculo)
    // :\s{1} vai procurar o caracter literal do dois ponts seguido de um espaço
    // tudo acima fica dentro de um paranteses para falar "vamos pegar daí pra frente"

    // (?!\s) negative look around, vai ignorar os contratantes do fim do documento (que tem só espaço a frente deles)
    // .*\n pega qualquer coisa até o primeiro \n
    // .*? non greety, esse ? faz com que ele pare na primeira recorrência, assim ele evita ficar em loop

    // $ informa que a pesquisa acaba no fim da linha
    // g --> global
    // m --> multiline
    // i --> insensitive
    const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi

    const onlyPerson = this.#content.match(matchPerson)
    
    this.#content = onlyPerson

    return this
  }

  build() {
    return this.#content
  }
}

module.exports = TextProcessorFluentAPI
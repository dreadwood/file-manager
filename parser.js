/**
 * @param {string} input
 * @returns {[string, string]} [argument, remainingInput]
 */
const getArgument = (input) => {
  const quote = "'";
  const doubleQuote = '"';
  
  let argument;
  let remainingInput;

  if (input.startsWith(quote)) {
    const startQuote = input.indexOf(quote);
    const finish = input.indexOf(quote, startQuote + 1);

    argument = input.slice(startQuote + 1, finish);
    remainingInput = input.slice(finish + 1).trim();

  } else if (input.startsWith(doubleQuote)) {
    const start = input.indexOf(doubleQuote);
    const finish = input.indexOf(doubleQuote, start + 1);

    argument = input.slice(start + 1, finish);
    remainingInput = input.slice(finish + 1).trim();
  } else {
    const index = input.indexOf(' ');
    
    if (index !== -1) {
      argument = input.slice(0, index);
      remainingInput = input.slice(index + 1).trim();
    } else {
      argument = input;
      remainingInput = '';
    }
  }

  return [argument, remainingInput]
}

/**
 * @param {string} input
 */
export const parser = (input) => {
  let command = '';
  let inputArguments = '';

  const index = input.trim().indexOf(' ');
  command = input.slice(0, index)

  if (index !== -1) {
    command = input.slice(0, index)
    inputArguments = input.slice(index + 1).trim();
  } else {
    command = input.trim();
  }

  const [firstArguments, remainingArgument] = getArgument(inputArguments);
  const [secondArguments] = getArgument(remainingArgument);

  return [command, firstArguments, secondArguments]
}

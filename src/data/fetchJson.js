export async function getData() {
  try {
    const response = await fetch('/src/data/data.json');
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  }
}


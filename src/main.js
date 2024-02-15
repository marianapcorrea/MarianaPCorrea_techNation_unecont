import { INDICATORS_FILTERS, INVOICES_FILTERS, INVOICE_STATUS, MONTHS, TRIMESTERS, YEARS } from "./data/auxiliarData";
import { getData } from "./data/fetchJson";

const navOption = document.querySelectorAll('.navOption')
const tabs = document.querySelectorAll('.tab')
const filterInput = document.querySelector('#indicators-filter')
const vigencyYear = document.querySelector('#vigency-year')
const filterIndicatorBy = document.querySelector('#filter-indicators-by')
const invoiceFilterInput = document.querySelector('#invoice-filter')
const filterInvoiceBy = document.querySelector('#filter-invoice-by')
const invoiceDataContainer =document.querySelector("#invoice-data")


// Função para adicionar a classe navOptionActive ao clicar em uma opção do menu lateral
const handleNavOption = (e) => {
  e.preventDefault();
  const activeOption = document.querySelector('.navOptionActive')
  activeOption.classList.remove('navOptionActive')
  e.target.classList.add('navOptionActive')
}

// Função para alternar a visibilidade do conteúdo  ao clicar em uma aba
const handleTabChoice = ({target}) => {
  const indicatorsSection = document.querySelector('#indicators-section')
const invoiceSection = document.querySelector('#invoice-section')

  target.value === "indicators" ? (
    (invoiceSection.style.display = "none")  && 
    (indicatorsSection.style.display="block")
    ) : (
    (indicatorsSection.style.display = "none") && (invoiceSection.style.display = "block")
)
}

//Cria um elemento option para ser adicionado ao filtro
const createOptionElemente = (value, className) => {
  const optionEL =document.createElement('option')
  optionEL.value = value
  optionEL.innerText = value
  optionEL.classList.add(className)
return optionEL
}

const handleInitialFiltersPopulation = () => {
  const selectElArray = document.querySelectorAll('select')
  selectElArray.forEach(({id}) => handleFiltersOptions(id))
  filterInput.appendChild(createOptionElemente('--','filter-option'))

  invoiceFilterInput.appendChild(createOptionElemente('--','filter-option'))
}

// Função para adicionar as opções de filtro de acordo com o id do elemento
const handleFiltersOptions = (sectionID)=> {
  switch (sectionID) {
    case "filter-indicators-by":
      INDICATORS_FILTERS.forEach((filter) => {
        filterIndicatorBy.appendChild(createOptionElemente(filter, 'filter-category'))})
      break;
    case "filter-invoice-by":
      INVOICES_FILTERS.forEach((filter) => {
        filterInvoiceBy.appendChild(createOptionElemente(filter, 'filter-category'))})
      break;

    case "vigency-year":
      YEARS.forEach((year) => {
        vigencyYear.appendChild(createOptionElemente(year, 'filter-option'))
      })
      break;
  }
}

// Função para adicionar as opções de filtro de acordo com o período selecionado - Indicadores
const handleFiltersIndicators = ({target}) => {
  // Remove as opções anteriores
  const options = document.querySelectorAll('#indicators-filter .filter-option')
  options.forEach((option) => option.remove())

  switch (target.value) {
    case "Tudo": 
    filterInput.appendChild(createOptionElemente("--",'filter-option'))
    break;
    case "Mês": 
    MONTHS.forEach((month) => {
      filterInput.appendChild(createOptionElemente(month, 'filter-option'))
    })
    case "Trimestre": 
    TRIMESTERS.forEach((trimester) => {
      filterInput.appendChild(createOptionElemente(trimester,'filter-option'))
    })
    break;

  }
}

// Função para adicionar as opções de filtro de acordo com o período selecionado - Notas Fiscais
const handleFiltersInvoice = ({target}) => {
  // Remove as opções anteriores
  const options = document.querySelectorAll('#invoice-filter .filter-option')
  options.forEach((option) => option.remove())

  switch (target.value) {
    case "Mês de emissão":
      case "Mês de cobrança":
      case "Mês de pagamento": 
    MONTHS.forEach((month) => {
      invoiceFilterInput.appendChild(createOptionElemente(month,'filter-option'))
    })
    break;

    case "Status da nota": 
    INVOICE_STATUS.forEach((status) => {
      invoiceFilterInput.appendChild(createOptionElemente(status,'filter-option'))
    })
    break;
  }
}

// Função de geração dinâmica de elementos li para dados de notas fiscais
const createInvoiceItem = ({payerName, invoiceId, emissionDate, dueDate, paymentDate, invoiceValue, bankDocument, invoiceStatus}) => {
  const itemLi = document.createElement('li');
  itemLi.classList.add('invoice-item-data');

  const div1 = createDiv('Nome do Pagador: ', payerName, 'Número de identificação da nota: ', invoiceId);
  itemLi.appendChild(div1);

  const div2 = createDiv('Data de emissão', emissionDate, 'Data da cobrança: ', dueDate, 'Data do pagamento: ', paymentDate);
  itemLi.appendChild(div2);

  const div3 = createDiv('Valor da nota: R$ ', (invoiceValue.toFixed(2)), 'Documento do boleto bancário: ', bankDocument, 'Status da nota: ', invoiceStatus);
  itemLi.appendChild(div3);

  return itemLi;
};

const createDiv = (...args) => {
  const div = document.createElement('div');

  for (let i = 0; i < args.length; i += 2) {
    const span1 = document.createElement('span');
    span1.classList.add('title');
    span1.textContent = args[i];
    const span2 = document.createElement('span');
    span2.classList.add('data');
    span2.textContent = args[i + 1];
    
    const spanContainer = document.createElement('span');
    spanContainer.appendChild(span1);
    spanContainer.appendChild(span2);

    div.appendChild(spanContainer);
  }

  return div;
};



window.onload = async()=> {
  //fetch de dados de notas fiscais (json)
  const {invoices} = await getData()

  // Adiciona event listener para cada anchor no menu lateral
  navOption.forEach((option) => option.addEventListener('click', (event)=> handleNavOption(event)))

  //adiciona event listener para cada aba
  tabs.forEach((tab) => tab.addEventListener('click', (event)=> handleTabChoice(event)))

  //Popula os filtros de acordo com as opções disponíveis
  handleInitialFiltersPopulation()

  // Adiciona event listener para o filtro de indicadores
  filterIndicatorBy.addEventListener('change', (event)=> handleFiltersIndicators(event))

  filterInvoiceBy.addEventListener('change', (event)=> 
  handleFiltersInvoice(event))

  // Renderiza inicialmente as notas fiscais em elementos li
  invoices?.forEach((invoice) => {
    const invoiceItem = createInvoiceItem(invoice);
    invoiceDataContainer.appendChild(invoiceItem);
  });
  }

  /* 
  A fazer:
    Indicadores:
      - Criar função para lidar com filtros;
      - Criar função para modificar valores dos cards de acordo com o filtro
      - Estilizar Charts;
      - Estilização Fina de Cards;

    Notas Fiscais:
      - Criar função para lidar com filtros;
      - Criar função para deixar dinamico a renderização de notas.
      - Criar notas fiscais falsas para renderizar;

    Geral:
      - Estilização de filtros
      - Criar documentação para o projeto, explicando a estrutura, funcionalidades e decisões tomadas;
      - Modificar package.json para adicionar informações sobre o projeto e pessoa desenvolvedora;
      - Criar repo public no github;
      - head: trocar icone e titulo;
      - Estilização mobile;
      - Adicionar icones;
      - Adicionar transições;
      
  */
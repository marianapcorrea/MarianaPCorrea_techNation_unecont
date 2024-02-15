import { INDICATORS_FILTERS, INVOICES_FILTERS, INVOICE_STATUS, MONTHS, TRIMESTERS, YEARS } from "./data/utils";

const navOption = document.querySelectorAll('.navOption')
const tabs = document.querySelectorAll('.tab')
const filterInput = document.querySelector('#indicators-filter')
const vigencyYear = document.querySelector('#vigency-year')
const filterIndicatorBy = document.querySelector('#filter-indicators-by')
const invoiceFilterInput = document.querySelector('#invoice-filter')
const filterInvoiceBy = document.querySelector('#filter-invoice-by')


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
  console.log('target', target.value)
  // Remove as opções anteriores
  const options = document.querySelectorAll('#invoice-filter .filter-option')
  options.forEach((option) => option.remove())

  switch (target.value) {
    case "Mês de emissão":
      case "Mês de cobrança":
      case "Mês de pagamento": 
    console.log('mes de emissao')
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





window.onload = ()=> {
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
  }

  /* 
  A fazer:
    Indicadores:
      - Adicionar event listener para input de filtro;
      - Criar função para lidar com filtros;
      - Criar função para modificar valores dos cards de acordo com o filtro
      - Estilizar Charts;
      - Estilização Fina de Cards;

    Notas Fiscais:
      - Criar handler e eventListener para filtro de notas fiscais;
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
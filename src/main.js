import { INDICATORS_FILTERS, INVOICES_FILTERS, MONTHS, TRIMESTERS, YEARS } from "./data/utils";

const navOption = document.querySelectorAll('.navOption')
const tabs = document.querySelectorAll('.tab')
const filterInput = document.querySelector('#indicators-filter')
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
  }
}
// Função para adicionar as opções de filtro de acordo com o indicador selecionado
const handleFiltersIndicators = ({target}) => {
  // Remove as opções anteriores
  const options = document.querySelectorAll('#indicators-filter .filter-option')
  options.forEach((option) => option.remove())

  switch (target.value) {
    case "month": 
    MONTHS.forEach((month) => {
      filterInput.appendChild(createOptionElemente(month, 'filter-option'))
    })
    break;
    case "trimester": 
    TRIMESTERS.forEach((trimester) => {
      filterInput.appendChild(createOptionElemente(trimester,'filter-option'))
    })
    break;

    case "year": 
    YEARS.forEach((year) => {
      filterInput.appendChild(createOptionElemente(year,'filter-option'))
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
  handleFiltersOptions('filter-indicators-by')
  handleFiltersOptions('filter-invoice-by')

  YEARS.forEach((year) => filterInput.appendChild(createOptionElemente(year)))

    invoiceFilterInput.appendChild(createOptionElemente('--'))
  
  // Adiciona event listener para o filtro de indicadores
  filterIndicatorBy.addEventListener('change', (event)=> handleFiltersIndicators(event))
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
      - Estilização mobile;
      - Criar documentação para o projeto, explicando a estrutura, funções e decisões tomadas;
      - Modificar package.json para adicionar informações sobre o projeto e pessoa desenvolvedora;
      - Criar repo public no github;
      
  */
import { INDICATORS_FILTERS, INVOICES_FILTERS, INVOICE_STATUS, MONTHS, TRIMESTERS, YEARS } from "./data/auxiliarData";
import { getData } from "./data/fetchJson";
import { clearCards,createOptionElemente, getInvoiceFilterByValue, createInvoiceItem, createNoDataCard, filterByMonth, handleValuesSum } from "./utils";

const navOption = document.querySelectorAll('.navOption')
const tabs = document.querySelectorAll('.tab')
const filterInput = document.querySelector('#indicators-filter')
const vigencyYear = document.querySelector('#vigency-year')
const filterIndicatorBy = document.querySelector('#filter-indicators-by')
const invoiceFilterInput = document.querySelector('#invoice-filter')
const filterInvoiceBy = document.querySelector('#filter-invoice-by')
const invoiceDataContainer =document.querySelector("#invoice-data")
const cardFullValue = document.querySelector('#full-value div span')


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

// Função para popular os filtros iniciais
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
const handleFiltersInvoice = ({target},data) => {
  // Remove as opções anteriores
  const options = document.querySelectorAll('#invoice-filter .filter-option')
  options.forEach((option) => option.remove())

  switch (target.value) {
    case "Todas":
    invoiceFilterInput.appendChild(createOptionElemente("--",'filter-option'))
    data?.forEach((invoice) => {
      invoiceDataContainer.appendChild(createInvoiceItem(invoice));
    })
    break
  
    case "Mês de emissão":
      case "Mês de cobrança":
      case "Mês de pagamento": 
    MONTHS.forEach((month) => {
      invoiceFilterInput.appendChild(createOptionElemente((month),'filter-option'))
    })
    break;

    case "Status da nota": 
    INVOICE_STATUS.forEach((status) => {
      invoiceFilterInput.appendChild(createOptionElemente(status,'filter-option'))
    })
    break;
  }
}

// Função para aplicar o filtro de acordo com o valor selecionado
const applyFilterInvoice = ({target},data) => {
  let filteredData = []
  const filter = getInvoiceFilterByValue(filterInvoiceBy.value)
if (filter ==='invoiceStatus') {
  filteredData = data?.filter((invoice) => invoice[filter] === target.value)
}
  MONTHS.forEach((month, i) =>{
  switch (target.value) {
    case month==="--":
      data?.forEach((invoice) => {
        invoiceDataContainer.appendChild(createInvoiceItem(invoice));
      })
      case month:
        filteredData = filterByMonth(data, filter,i)
    }} )
    return filteredData.length>0? handleInvoiceCardPopulation(filteredData):  createNoDataCard()
}

// Renderiza  as notas fiscais em elementos li
const handleInvoiceCardPopulation= (invoices)=>{ 
  clearCards()
invoices?.forEach((invoice) => {
  const invoiceItem = createInvoiceItem(invoice);
  invoiceDataContainer.appendChild(invoiceItem);
});
}

window.onload = async()=> {
  //fetch de dados de notas fiscais (json)
  const {invoices} = await getData()

  // Adiciona event listener para cada anchor no menu lateral
  navOption.forEach((option) => option.addEventListener('click', (event)=> handleNavOption(event)))

  //adiciona event listener para cada aba
  tabs.forEach((tab) => tab.addEventListener('click', (event)=> handleTabChoice(event)))

  //Popula os filtros de acordo com as opções disponíveis
  handleInitialFiltersPopulation()

  // Adiciona event listener para os filtros
  filterIndicatorBy.addEventListener('change', (event)=> handleFiltersIndicators(event))

  filterInvoiceBy.addEventListener('change', (event)=> 
  handleFiltersInvoice(event, invoices))

  handleInvoiceCardPopulation(invoices)

  invoiceFilterInput.addEventListener('change', (event) => applyFilterInvoice(event, invoices))
  cardFullValue.innerHTML =handleValuesSum(invoices).toFixed(2)
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

    Geral:
      - Adicionar filtro para ano vigente
      - Estilização de filtros
      - Criar documentação para o projeto, explicando a estrutura, funcionalidades e decisões tomadas;
      - head: trocar icone e titulo;
      - Estilização mobile;
      - Adicionar icones;applyFilterInvoice
      - Adicionar transições;
      
  */
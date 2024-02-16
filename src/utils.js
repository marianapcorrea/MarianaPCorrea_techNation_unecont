import { INVOICES_FILTERS } from "./data/auxiliarData"
import { invoiceDataContainer } from "./main"

/* ----------------------------- GLOBAL ----------------------------- */
//Cria um elemento option para ser adicionado ao filtro
export const createOptionElemente = (value, className) => {
  const optionEL =document.createElement('option')
  optionEL.value = value
  optionEL.innerText = value
  optionEL.classList.add(className)
return optionEL
}

export const filterByMonth = (data,filter, month) => {
  return data.filter((el) => el[filter].split('/')[1]?.includes(month))
}

/* ----------------------------- INVOICE SECTION ----------------------------- */
// Limpa os elementos li de notas fiscais
export const clearCards = ()=>document.querySelectorAll('.invoice-item-data').forEach((card) => card.remove())

export const getInvoiceFilterByValue =(choosedFilter)=>{
  let filterName = ""
  const filtersOptions = ['Tudo', 'emissionDate', 'dueDate', 'paymentDate', 'invoiceStatus']
  
  INVOICES_FILTERS.forEach((filter, i) => {
    choosedFilter === filter ? filterName = filtersOptions[i] : 'Tudo'
  })
return filterName
    
  }

  // Função de geração dinâmica de elementos li para dados de notas fiscais
export const createInvoiceItem = ({payerName, invoiceId, emissionDate, dueDate, paymentDate, invoiceValue, bankDocument, invoiceStatus}) => {
  const itemLi = document.createElement('li');
  itemLi.classList.add('invoice-item-data');

  const div1 = createDiv('Nome do Pagador: ', payerName, 'Número de identificação da nota: ', invoiceId);
  itemLi.appendChild(div1);

  const div2 = createDiv('Data de emissão: ', emissionDate, 'Data da cobrança: ', dueDate? dueDate:'--', 'Data do pagamento: ', paymentDate? paymentDate: '--');
  itemLi.appendChild(div2);

  const div3 = createDiv('Valor da nota: R$ ', (invoiceValue.toFixed(2)), 'Documento do boleto bancário: ', bankDocument ? bankDocument:'--', 'Status da nota: ', invoiceStatus? invoiceStatus: '--');
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

export const createNoDataCard = () => {
  clearCards()
  const pEl = document.createElement('p')
  pEl.classList.add('invoice-item-data')
  pEl.innerHTML = "Nenhuma nota fiscal encontrada"
  invoiceDataContainer.appendChild(pEl);
}



/* ----------------------------- IDICATORS SECTION ----------------------------- */
export const handleValuesSum = (invoices) => invoices.reduce((acc, {invoiceValue}) => acc + invoiceValue, 0)
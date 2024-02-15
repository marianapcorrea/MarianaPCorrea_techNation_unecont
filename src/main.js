const navOption = document.querySelectorAll('.navOption')
const tabs = document.querySelectorAll('.tab')


// Função para adicionar a classe navOptionActive ao clicar em uma opção do menu lateral
const handleNavOption = (e) => {
  e.preventDefault();
  const activeOption = document.querySelector('.navOptionActive')
  activeOption.classList.remove('navOptionActive')
  e.target.classList.add('navOptionActive')
}

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



window.onload = ()=> {
  // Adiciona event listener para cada anchor no menu lateral
  navOption.forEach((option) => {
  option.addEventListener('click', ()=>handleNavOption(event))
})
console.log(tabs)
  //adiciona event listener para cada aba
  tabs.forEach((tab) => {
    tab.addEventListener('click', ()=>handleTabChoice(event))
  })

  }
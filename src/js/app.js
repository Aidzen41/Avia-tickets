import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './view/form';
import ticketsUI from './view/tickets';
import currencyUI from './view/currency';

document.addEventListener('DOMContentLoaded', () => {
  initApp();

  const form = formUI.form;


  // Events
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onFormSybmit();

  });

  // Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
  }

  async function onFormSybmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const deaprt_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;


    await locations.fetchTickets({
      origin, 
      destination,
      deaprt_date, 
      return_date,
      currency,
    });
    ticketsUI.renderTickets(locations.lastSearch);
  }
  
})
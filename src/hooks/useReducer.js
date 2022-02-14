const useReducer = (state, action) => {
  const filterBySize = (event, currentData) => {
    switch (event) {
      case 'X-Small':
        return currentData.filter((item) => item.xsmall === true);
      case 'Small':
        return currentData.filter((item) => item.small === true);
      case 'Medium':
        return currentData.filter((item) => item.medium === true);
      case 'Large':
        return currentData.filter((item) => item.large === true);
      case 'X-Large':
        return currentData.filter((item) => item.xlarge === true);
      default:
        throw new Error();
    }
  };

  const filterByCategory = (event, currentData) => {
    return currentData.filter((item) => item.category.toLowerCase() === event.toLowerCase());
  };

  //The initial data sent to useReducer Hoook
  let data = action.data;

  switch (action.sort) {
    //--------------------------------------------------------------
    case 'Nyaste':
      //Filtrerar på kategori
      if (action.filter !== '') {
        data = filterByCategory(action.filter, data);
      }
      //Filtrera på storlek
      if (action.size !== '') {
        data = filterBySize(action.size, data);
      }
      //Filter by date
      data = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      //Return value
      return {
        ...state,
        data: data,
      };
    //--------------------------------------------------------------
    case 'Namn A-Ö':
      if (action.filter !== '') {
        data = filterByCategory(action.filter, data);
      }
      //Filtrera på storlek
      if (action.size !== '') {
        data = filterBySize(action.size, data);
      }
      //Filter by pris lägst först
      data = data.sort((a, b) => (a.name > b.name ? 1 : -1));
      //Return value
      return {
        ...state,
        data: data,
      };
    //--------------------------------------------------------------
    case 'Namn Ö-A':
      if (action.filter !== '') {
        data = filterByCategory(action.filter, data);
      }
      //Filtrera på storlek
      if (action.size !== '') {
        data = filterBySize(action.size, data);
      }
      //Filter by pris lägst först
      data = data.sort((a, b) => (a.name < b.name ? 1 : -1));
      //Return value
      return {
        ...state,
        data: data,
      };
    //--------------------------------------------------------------
    case 'Lägst pris':
      //Filtrerar på kategori
      if (action.filter !== '') {
        data = filterByCategory(action.filter, data);
      }
      //Filtrera på storlek
      if (action.size !== '') {
        data = filterBySize(action.size, data);
      }
      //Filter by pris lägst först
      data = data.sort((a, b) => a.price - b.price);
      //Return value
      return {
        ...state,
        data: data,
      };
    //--------------------------------------------------------------
    case 'Högst pris':
      //Filtrerar på kategori
      if (action.filter !== '') {
        data = filterByCategory(action.filter, data);
      }
      //Filtrera på storlek
      if (action.size !== '') {
        data = filterBySize(action.size, data);
      }
      //Filter by pris lägst först
      data = data.sort((a, b) => b.price - a.price);
      //Return value
      return {
        ...state,
        data: data,
      };
    default:
      throw new Error();
  }
};

export default useReducer;

"use client"
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import SearchandContent from './SearchandContent';
import SearchHistory from './SearchHistory';

const SearchProvidervider = () => {
  return (
    <Provider store={store}>
        <SearchandContent />
    </Provider>
  )
}

export default SearchProvidervider
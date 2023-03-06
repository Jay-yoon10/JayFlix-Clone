import { useLocation, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  getSearchData,
  IGetDataResult,
  IGetSearch,
  LIST_TYPE,
  Type,
} from '../api';
import Sliders from '../Components/Sliders';

export default function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');

  const { data: searchQuery } = useQuery<IGetSearch>(
    [Type.Search, keyword],
    () => getSearchData(keyword as any)
  );
  return (
    <div>
      <Sliders
        data={searchQuery as IGetDataResult}
        title={`Your Search results for ${keyword}`}
        type={'search'}
        list={LIST_TYPE[8]}
        category={'searchHome'}
        keyword={keyword || ''}
      />
    </div>
  );
}

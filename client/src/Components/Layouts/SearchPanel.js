import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SingleChat } from '../Exports'
import { UserApi, useSearchQuery } from './../../Redux/APIs/UserApi';
const SearchPanel = ({ keyword }) => {
  const [page, setPage] = useState(1);
  // eslint-disable-next-line 
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const { data, isError, isFetching, error } = useSearchQuery(keyword);
  const { users, totalCount } = data || {};
  const { username } = useParams()
  const fetchMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (totalCount === 0) {
      setHasMore(false);
    }
  }, [totalCount, page]);

  useEffect(() => {
    if (page > 1) {
      dispatch(
        UserApi.endpoints.SearchMore.initiate({
          keyword,
          page
        })
      );
    }
  }, [page, keyword, dispatch]);

  return (
    <>
      <div className='overflow-y-scroll hideScrollBar border-r h-full'>
        {isFetching ?
          <div className='space-y-7 py-5'>

          </div>
          : isError ? <p>{error?.data?.msg}</p> :

            <InfiniteScroll
              dataLength={users.length}
              next={fetchMore}
              hasMore={hasMore}
              // loader={<h4>Loading...</h4>}
              className='overflow-y-scroll !h-full hideScrollBar mt-10 lg:mt-0'
            >
              {users?.map(chat => (
                <div key={chat?._id}>
                  <SingleChat chat={chat} username={username} />
                </div>
              ))}
            </InfiniteScroll>
        }
      </div>
    </>
  )
}

export default SearchPanel

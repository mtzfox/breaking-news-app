import React from 'react'
import Item from './Item'
import { Container, Segment, Form, Select, List, Pagination } from 'semantic-ui-react'
import './App.css'

async function searchNews(q, time, offset) {
  q = encodeURIComponent(q);
  time = time || '';
  offset = offset || 0;
  const response = await fetch(`https://bing-news-search1.p.rapidapi.com/news/search?safeSearch=Off&textFormat=Raw&freshness=${time}&setLang=EN&count=10&q=${q}&offset=${offset}`, {
    "method": "GET",
    headers: {
      'X-BingApis-SDK': 'true',
      'X-RapidAPI-Key': '863282c3d2mshff2e9b0d41e0b9dp1108aejsn2cdb551261da',
      'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
    }
  });
  const body = await response.json();
  return body.value;
  }
  
export default function App() {
  const [query, setQuery] = React.useState("");
  const [list, setList] = React.useState(null);
  const [page, setPage] = React.useState("1");
  const [offset, setOffset] = React.useState(0);
  const [time, setTime] = React.useState('');

  const timeOptions = [
    { key: 'any', text: 'Any Time', value: '' },
    { key: 'day', text: 'Day', value: 'day' },
    { key: 'week', text: 'Week', value: 'week' },
    { key: 'month', text: 'Month', value: 'month' },
  ];


  const handleTime = (e, {value}) => setTime(value);

  const handleChange = (e, {value}) => setQuery(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1)
    setOffset(0);
    searchNews(query, time, offset).then(setList);
  };
  const handlePageChange = (e, { activePage }, ) => {
    e.preventDefault();
    let offset = (activePage - 1) * 10;
    setPage(activePage);
    setOffset(offset);
    searchNews(query, time, offset).then(setList);
  }


  return (
    <div className="app">
      <Container className='container'>
        <h1>Search Recent News</h1>
        <Segment.Group>
          <Segment basic textAlign="center">
            
            <Form onSubmit={handleSubmit} className="searchForm"> 
              <Form.Group>
                <Form.Input 
                  placeholder="Enter Search Term" 
                  value={query} 
                  onChange={handleChange}
                />  
                <Form.Input
                  control={Select}
                  placeholder='Any Time'
                  options={timeOptions}
                  value={time}
                  
                  
                  search
                  searchInput={{ id: 'form-select-control-time' }}
                  htmlFor='form-select-control-time'
                  
                  onChange={handleTime}
                />
                <Form.Button primary content='Search' className='button' />
              </Form.Group>
            </Form>
                
          </Segment>
          <Segment className="results">

              {!list
                ? null
                : list.length === 0
                  ? <p><i>No results</i></p>
                  : 
                <>  
                <span style={{paddingLeft:"10px"}}>Results {offset+1} - {offset+10}</span>
                <List relaxed>
                  {list.map(({...props}) => (
                    <Item key={props.id} {...props} />
                  ))}
                </List>
                <Pagination
                  boundaryRange={0}
                  activePage={page}
                  ellipsisItem={null}
                  firstItem={null}
                  lastItem={null}
                  siblingRange={1}
                  totalPages={10}
                  onPageChange={handlePageChange}
                />
                <span style={{paddingLeft:"10px"}}>Page {page}</span>
                </>
              }
          </Segment>
        </Segment.Group>
      </Container>
    </div>
  )
}
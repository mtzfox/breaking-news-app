import React from 'react'
import Item from './Item'
import { Container, Segment, Form, List, Pagination } from 'semantic-ui-react'
import './App.css'

async function searchNews(q, offset) {
  q = encodeURIComponent(q);
  offset = offset || 0;
  const response = await fetch(`https://bing-news-search1.p.rapidapi.com/news/search?safeSearch=Off&textFormat=Raw&freshness=Day&setLang=EN&count=10&q=${q}&offset=${offset}`, {
    "method": "GET",
    headers: {
      'X-BingApis-SDK': 'true',
      'X-RapidAPI-Key': '863282c3d2mshff2e9b0d41e0b9dp1108aejsn2cdb551261da',
      'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
    }
  });
  console.log(response);
  const body = await response.json();
  return body.value;
  }


export default function App() {
  const [query, setQuery] = React.useState("cat");
  const [list, setList] = React.useState(null);
  const [page, setPage] = React.useState("1");
  const [offset, setOffset] = React.useState(0);
  const handleChange = e => setQuery(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1)
    setOffset(0);
    searchNews(query).then(setList);
  };
  const handlePageChange = (e, { activePage }) => {
    e.preventDefault();
    let offset = (activePage - 1) * 10;
    setPage(activePage);
    setOffset(offset);
    searchNews(query, offset).then(setList);
  }
  console.log(list);
  return (
    <div className="app">
      <Container className='container'>
        <h1>Search Recent News</h1>
        <Segment.Group>
          <Segment basic textAlign="center">
            
            <Form onSubmit={handleSubmit} className="searchForm"> 
              <Form.Group>
                <Form.Input 
                  placeholder="Search News" 
                  value={query} 
                  onChange={handleChange} 
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
                  {list.map(({ObjectId, ...props}) => (
                    <Item key={ObjectId} {...props} />
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
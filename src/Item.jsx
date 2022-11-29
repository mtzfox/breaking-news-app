import React from 'react'
import './index.css'
import { Segment, List, Grid, Image, Card, CardDescription } from 'semantic-ui-react'

export default function Item({ item }) {

let { name, url, image, description } = item;
const separateWords = s => s.replace(/[A-Z][a-z]+/g, '$& ').trim();
const formatDate = s => new Date(s).toLocaleDateString(undefined, { dateStyle: 'long' });

return (
  
  <List.Item>
    <List.Content>
    <Segment piled className="search-result">
      <Grid stackable columns={1}>
        <Grid.Column mobile={2} tablet={3} computer={2} style={{backgroundColor:"#cce2ff"}}>
          {item.image &&
            <Image verticalAlign='middle' size='small' bordered rounded src={item.image?.thumbnail?.contentUrl} />
          }
        </Grid.Column>
        <Grid.Column mobile={16} tablet={9} computer={10}>
          <h3 className="title">
            <a href={item.url} target="_blank">{item.name}</a>
          </h3>
          <p className="description">
            {item.description}
          </p>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={4} computer={4} style={{borderLeft: "1px solid #B0B0B0"}}>
          <Card className="meta">
          <Card.Content><strong>{formatDate(item.datePublished)}</strong></Card.Content>
          <Card.Content className="provider">
            {item.provider[0].image?.thumbnail &&
              <img className="provider-thumbnail"
                alt=""
                src={item.provider[0].image.thumbnail.contentUrl + '&w=16&h=16'}
              />
            }
            {item.provider[0].name}
          </Card.Content>
          {item.category &&
          <Card.Content>
          
            <span>{separateWords(item.category)}</span>
          </Card.Content>
          }
          </Card>
        </Grid.Column>
      </Grid>
      </Segment>
    </List.Content>
  </List.Item>
);
}
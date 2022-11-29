import React, {Link} from 'react';
import './index.css';
import { Segment, List, Grid, Image, Card } from 'semantic-ui-react';



const Item = ({ name, url, image, description, provider, category, datePublished }) => {

  const separateWords = (s) => s.replace(/[A-Z][a-z]+/g, '$& ').trim();
  const formatDate = (s) =>
		new Date(s).toLocaleDateString(undefined, { dateStyle: 'long' });

  return (
	// const { name, url, image, description, provider, category, datePublished } = props;

		<List.Item>
			<List.Content>
				<Segment piled className='search-result'>
					<Grid stackable columns={1}>


						<Grid.Column
              className="item"
							mobile={2}
							tablet={3}
							computer={2}
              verticalAlign='middle'
						>
								<Image
                  className='thumbnail'
									size='small'
									bordered
									rounded
                  as='img'
                  floated='left'
									src={image?.thumbnail?.contentUrl}
								/>
						</Grid.Column>

						<Grid.Column mobile={14} tablet={9} computer={10}>
            
							<h4>{formatDate(datePublished)}</h4>
							<h3 className='title'>
								<a href={url} target='_blank'>
									{name}
								</a>
							</h3>
							<p className='description'>{description}</p>
						</Grid.Column>


						<Grid.Column
              className='meta'
							mobile={16}
							tablet={4}
							computer={4}
              verticalAlign='middle'
						>
							<Card className='meta'>
								
								<Card.Content className='provider'>
									<>
										{provider[0].image?.thumbnail && (
											<img
												className='provider-thumbnail'
												alt=''
                        as='img'
												src={
													provider[0].image.thumbnail.contentUrl +
													'&w=16&h=16'
												}
											/>
										)}
										{provider[0].name}
									</>
								</Card.Content>

								{category && (
									<Card.Content>
										<span>{separateWords(category)}</span>
									</Card.Content>
								)}
							</Card>
						</Grid.Column>


					</Grid>
				</Segment>
			</List.Content>
		</List.Item>
  )
}


export default Item;
import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Input } from './style';
import { SearchBar, SearchIcon, } from './style';
import { BookMarkArea, BookMarkButtonBox1, BookMarkButton1, TextLabel1 } from './style';
import { BrowserSession } from '~/browserui/models/browser-session';
import { Form } from '../SearchBar/style';

var bookmarksData = [
  { "id": 1, "name": "Coin Desk", "identifier": "CD", color: "red", textColor: "white", "url": "https://www.coindesk.com" },
  { "id": 2, "name": "Etherscan", "identifier": "ES", color: "lightblue", "url": "https://etherscan.io/" },
  { "id": 3, "name": "Coinbase", "identifier": "CB", color: "gold", "url": "https://www.coinbase.com/" },
  { "id": 4, "name": "Mai Coin", "identifier": "MC", color: "grey", textColor: "white", "url": "https://www.maicoin.com/" },
  { "id": 5, "name": "Blockchain", "identifier": "BC", color: "green", "url": "https://www.blockchain.com/" },
  { "id": 6, "name": "Stocktwits - BTC", "identifier": "ST", color: "forestgreen", "url": "https://stocktwits.com/symbol/BTC.X" },
  { "id": 7, "name": "GitHub", "identifier": "GH", color: "blue", "url": "http://www.github.com" },
  { "id": 8, "name": "Unstoppable Domains", "identifier": "US", color: "orange", "url": "https://unstoppabledomains.com/" }
];

let currentSession: BrowserSession = null;

const handleUrlSubmit = (event: any) => {
  event.preventDefault();
  var url = currentSession.selectedTab.emptyTabUrlValue;
  currentSession.selectedTab.url = url;
}

const handleBookMarkButton1Click = (bookmarkData: any) => {
  if(bookmarkData.url){
    currentSession.selectedTab.url = bookmarkData.url;
  }
}

const handleUrlBarChange = (event: any) => {
  if (currentSession.selectedTab) {
    currentSession.selectedTab.emptyTabUrlValue = event.target.value;
  }
}

var BookMarkButtons = () => {
  var bookmarks = bookmarksData.map(item => (
    <BookMarkButtonBox1 key={item.id} onClick={(event) => { handleBookMarkButton1Click(item)}}>
      <BookMarkButton1 color={item.color} textColor={item.textColor}>
        {item.identifier}
      </BookMarkButton1>
      <TextLabel1>{item.name}</TextLabel1>
    </BookMarkButtonBox1>
  ));

  return bookmarks;
}

export const EmptyTab = observer(({ visible, browserSession }: { visible: boolean, browserSession: BrowserSession }) => {
  currentSession = browserSession;

  var pageStyle: any = {
    display: visible ? "block" : "none",
    boxSizing: 'border-box',
    height: '100%'
  }

  return (
    <div style={pageStyle}>
      <Container>
        <Form onSubmit={handleUrlSubmit}>
          <SearchBar>
            <Input type="text" placeholder="Search or type in URL"
              value={browserSession.selectedTab.emptyTabUrlValue}
              onChange={handleUrlBarChange} />
            <SearchIcon />
          </SearchBar>
        </Form>
        <BookMarkArea onClick={handleBookMarkButton1Click}>
          {BookMarkButtons()}
        </BookMarkArea>
      </Container>
    </div>
  )
})
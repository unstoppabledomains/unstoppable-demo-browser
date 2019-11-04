import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Input } from './style';
import { SearchBar, SearchIcon, } from './style';
import { BookMarkArea, BookMarkButtonBox1, BookMarkButton1, TextLabel1 } from './style';
import { BrowserSession } from '~/browserui/models/browser-session';
import { Form } from '../SearchBar/style';

var bookmarksData = [
  { "id": 1, "name": "Coin Desk", "thumb": "build/search-icons/coindesk.png", "url": "https://www.coindesk.com" },
  { "id": 2, "name": "Etherscan", "thumb": "build/search-icons/etherscan.png", "url": "https://etherscan.io/" },
  { "id": 3, "name": "Coinbase", "thumb": "build/search-icons/coinbase.png", "url": "https://www.coinbase.com/" },
  { "id": 4, "name": "Mai Coin", "thumb": "build/search-icons/maicoin.png", "url": "https://www.maicoin.com/" },
  { "id": 5, "name": "Blockchain", "thumb": "build/search-icons/blockchain.png", "url": "https://www.blockchain.com/" },
  { "id": 6, "name": "Stocktwits - BTC", "thumb": "build/search-icons/stocktwits.png", "url": "https://stocktwits.com/symbol/BTC.X" },
  { "id": 7, "name": "GitHub", "thumb": "build/search-icons/github.png", "url": "http://www.github.com" },
  { "id": 8, "name": "Walt", "thumb": "build/search-icons/walt.png", "url": "http://walt.fyi/" }
];

let currentSession: BrowserSession = null;

const handleUrlSubmit = (event: any) => {
  event.preventDefault();
  var url = currentSession.selectedTab.emptyTabUrlValue;
  currentSession.selectedTab.url = url;
}

// const handleMicrophoneClick = () => {
//   currentSession.selectedTab.url = currentSession.selectedTab.emptyTabUrlValue;
// }

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
      <BookMarkButton1>
        <img style={{ "width": "100%", "height": "100%" }} src={item.thumb} /><a href={item.url} />
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
            {/* <Microphone onClick={handleMicrophoneClick}>
            </Microphone> */}
          </SearchBar>
        </Form>
        <BookMarkArea onClick={handleBookMarkButton1Click}>
          {BookMarkButtons()}
        </BookMarkArea>
      </Container>
    </div>
  )
})
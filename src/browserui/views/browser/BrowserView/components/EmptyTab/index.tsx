import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Input } from './style';
import { SearchBar, SearchIcon, } from './style';
import { BookMarkArea, BookMarkButtonBox1, BookMarkButton1, TextLabel1 } from './style';
import { BrowserSession } from '~/browserui/models/browser-session';
import { Form } from '../SearchBar/style';

var bookmarksData = [
  { "id": 1, "name": "Coin Desk", "thumb": "https://static.coindesk.com/wp-content/uploads/2017/07/Screen-Shot-2017-07-17-at-7.36.51-AM-860x430.png", "url": "https://www.coindesk.com" },
  { "id": 2, "name": "Etherscan", "thumb": "https://pbs.twimg.com/profile_images/635495766744674305/DrBKyYcl_400x400.png", "url": "https://etherscan.io/" },
  { "id": 3, "name": "Coinbase", "thumb": "https://cdn-images-1.medium.com/max/1200/1*gBXfxLQiRiP5NycsMHPzKA.png", "url": "https://www.coinbase.com/" },
  { "id": 4, "name": "Mai Coin", "thumb": "https://www.maicoin.com/assets/grouping/maicoin-4e1caf66019fdc3ab329897bff1cbc617b7cfa317c76189687fc3964476e190d.svg", "url": "https://www.maicoin.com/" },
  { "id": 5, "name": "Blockchain", "thumb": "https://theme.zdassets.com/theme_assets/224702/f1769fc082175cd2e7ef495fc941b08f235d0a41.png", "url": "https://www.blockchain.com/" },
  { "id": 6, "name": "Stocktwits - BTC", "thumb": "https://yt3.ggpht.com/a/AGF-l7_ZqPm_Q_a9ihthi4CQ70XHf2r3RaQVr02wMw=s900-c-k-c0xffffffff-no-rj-mo", "url": "https://stocktwits.com/symbol/BTC.X" },
  { "id": 7, "name": "GitHub", "thumb": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPdpML_SXMqa794sB1TJDiBix0gsFwvkuE9cJ4KFdQvA2gA2J3&s", "url": "http://www.github.com" },
  { "id": 8, "name": "Walt", "thumb": "https://upload.wikimedia.org/wikipedia/commons/3/35/Wikipedia-W-bold-in-square-Clean.svg", "url": "http://walt.fyi/" }
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
          </SearchBar>
        </Form>
        <BookMarkArea onClick={handleBookMarkButton1Click}>
          {BookMarkButtons()}
        </BookMarkArea>
      </Container>
    </div>
  )
})
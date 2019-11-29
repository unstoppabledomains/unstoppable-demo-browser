import * as React from 'react';
import { observer } from 'mobx-react-lite';
import browserSession, { BrowserSession } from '~/browserui/models/browser-session';
import { BookmarksContainer } from './style';
import { Bookmark } from '~/browserui/models/bookmarks';

let currentSession: BrowserSession = null;


const handleBookmarkClick = (bookmark: Bookmark) => {
  console.log(bookmark.title);
  currentSession.selectedTab.url = bookmark.url;
}

const removeBookmark = (bookmark: Bookmark) => {
  console.log("Removing bookmark " + bookmark.title);
  currentSession.bookmarks.removeBookmark(bookmark);
}


export const BookmarksPage = observer(({ browserSession, visible }: { browserSession: BrowserSession, visible: boolean }) => {
  currentSession = browserSession;

  var pageStyle: any = {
    display: visible ? "block" : "none"
  }

  let bookmarks:any;

  if (browserSession.bookmarks.bookmarks.length > 0) {
    bookmarks = (
      <div>
        {browserSession.bookmarks.bookmarks.map(bookmark => (
          <div key={bookmark.title}>
            <a href='#' onClick={() => { handleBookmarkClick(bookmark) }}>{bookmark.title}</a> -
          &nbsp;<a href='#' onClick={() => { removeBookmark(bookmark) }}>Delete</a>
          </div>
        ))}
      </div>
    )
  } else {
    bookmarks = (
      <h2>
        You haven't bookmarked anything yet. <br /> Come back when you've bookmarked something.
      </h2>
    )
  }

  return (
    <BookmarksContainer style={pageStyle}>
      <h1>
        Bookmarks
      </h1>

      { bookmarks }

    </BookmarksContainer>
  );
});
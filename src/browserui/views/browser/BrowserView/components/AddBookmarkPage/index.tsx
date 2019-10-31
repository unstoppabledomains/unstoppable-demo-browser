import * as React from 'react';
import { observer } from 'mobx-react-lite';
import browserSession, { BrowserSession } from '~/browserui/models/browser-session';
import { AddBookmarkContainer, BookmarkForm, FormInput, FormTable } from './style';
import { BrowserState } from '~/browserui/models/tab';

let currentSession: BrowserSession = null;

const handleSaveBookmark = (event: any) => {
  event.preventDefault();
  
  try{
    currentSession.bookmarks.createPendingBookmark();
    currentSession.selectedTab.browserState = BrowserState.Bookmarks;
  }catch(err){
    console.log(err);
  }
}

const handleTitleChange = (event: any) => {
  currentSession.bookmarks.pendingTitle = event.target.value;
}

const handleUrlChange = (event: any) => {
  currentSession.bookmarks.pendingUrl = event.target.value;
}

const FormErrors = () => {
  if(currentSession.bookmarks.error){
    return (
      <div>
        {currentSession.bookmarks.error}
      </div>
    )
  }else{
    return (
      <span></span>
    )
  }
}

export const AddBookmarkPage = observer(({ browserSession, visible }: { browserSession: BrowserSession, visible: boolean }) => {
  currentSession = browserSession;

  var pageStyle: any = {
    display: visible ? "block" : "none"
  }

  return (
    <AddBookmarkContainer style={pageStyle}>
      <h1>Add Bookmark</h1>
      <BookmarkForm>
        <FormTable>
          <tbody>
            <tr>
              <td>&nbsp;</td>
              <td>{currentSession.bookmarks.error}</td>
            </tr>
            <tr>
              <td>Title</td>
              <td><FormInput type='text' placeholder='Website Name' value={browserSession.bookmarks.pendingTitle} onChange={handleTitleChange} /></td>
            </tr>
            <tr>
              <td>Url</td>
              <td><FormInput type='text' placeholder='Url' value={browserSession.bookmarks.pendingUrl} onChange={handleUrlChange} /></td>
            </tr>
            <tr>
              <td></td>
              <td><input type='submit' value='Save' onClick={handleSaveBookmark}/></td>
            </tr>
          </tbody>
        </FormTable >
      </BookmarkForm >
    </AddBookmarkContainer >
  );
});
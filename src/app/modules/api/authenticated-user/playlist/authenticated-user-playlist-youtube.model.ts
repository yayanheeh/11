import {IPlaylist} from '../../playlists/playlist.interface';
import {PlaylistYoutubeModel} from '../../playlists/playlist-youtube.model';
import {nested} from '../../../backbone/decorators/nested.decorator';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {PlaylistItemsYoutubeCollection} from '../../playlists/playlist-item/playlist-items-youtube.collection';
import {PlaylistItemYoutubeModel} from '../../playlists/playlist-item/playlist-item-youtube.model';
import {defaultValue} from '../../../backbone/decorators/default-value.decorator';
import {queryParam} from '../../../backbone/decorators/query-param.decorator';

export class AuthenticatedUserPlaylistYoutubeModel
  extends PlaylistYoutubeModel implements IPlaylist {

  endpoint = '/playlists';

  @queryParam()
  part = 'snippet,status';

  @attributesKey('canEdit')
  @defaultValue(true)
  canEdit: boolean;

  @attributesKey('items')
  @nested()
  items: PlaylistItemsYoutubeCollection<PlaylistItemYoutubeModel>;

  compose(attrs: any) {
    return {
      id: attrs.id,
      snippet: {
        title: attrs.title,
        description: attrs.description
      },
      status: {
        privacyStatus: attrs.isPublic ? 'public' : 'private'
      }
    };
  }

}

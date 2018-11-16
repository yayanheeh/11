import {FavouriteTrackItemYoutubeModel} from './favourite-track-item-youtube.model';
import {IFavouriteTrackItems} from './favourite-track-items.interface';
import {PlaylistItemYoutubeModel} from '../../playlists/playlist-item/playlist-item-youtube.model';
import {PlaylistItemsYoutubeCollection} from '../../playlists/playlist-item/playlist-items-youtube.collection';
import {IFavouriteTrackItem} from './favourite-track-item.interface';
import {queryParam} from '../../../backbone/decorators/query-param.decorator';

export class FavouriteTrackItemsYoutubeCollection<TModel extends FavouriteTrackItemYoutubeModel>
  extends PlaylistItemsYoutubeCollection<PlaylistItemYoutubeModel> implements IFavouriteTrackItems<IFavouriteTrackItem> {

  @queryParam()
  myRating = 'like';

  @queryParam()
  maxResults = 50;

  @queryParam()
  part = 'snippet';

  endpoint = '/videos';
  model = FavouriteTrackItemYoutubeModel;
}

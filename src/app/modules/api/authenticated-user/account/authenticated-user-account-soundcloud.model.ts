import {IAuthenticatedUserAccount} from './authenticated-user-account.interface';
import {AccountSoundcloudModel} from '../../account/account-soundcloud.model';
import {nested} from '../../../backbone/decorators/nested.decorator';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {AuthenticatedUserPlaylistSoundcloudModel} from '../playlist/authenticated-user-playlist-soundcloud.model';
import {AuthenticatedUserPlaylistsSoundcloudCollection} from '../playlist/authenticated-user-playlists-soundcloud.collection';
import {AuthenticatedUserPlaylistAuxappModel} from '../playlist/authenticated-user-playlist-auxapp.model';
import {FavouriteTracksSoundcloudModel} from '../../favourite-tracks/favourite-tracks-soundcloud.model';
import {defaultValue} from '../../../backbone/decorators/default-value.decorator';

export class AuthenticatedUserAccountSoundcloudModel
  extends AccountSoundcloudModel implements IAuthenticatedUserAccount {
  public loginUrl = `${this.hostName()}/soundcloud`;

  endpoint: '/users';

  @attributesKey('playlists')
  @nested()
  playlists: AuthenticatedUserPlaylistsSoundcloudCollection<AuthenticatedUserPlaylistSoundcloudModel>;

  @attributesKey('favouriteTracks')
  @nested()
  favouriteTracks: FavouriteTracksSoundcloudModel;

  @attributesKey('connected')
  @defaultValue(false)
  connected: boolean;

  parse(attrs: any) {
    if (attrs.image) {
      attrs.avatar_url = attrs.image.small;
    }
    return attrs;
  }

  createNewPlaylist(title: string, isPublic: boolean = false) {
    const playlist = new AuthenticatedUserPlaylistAuxappModel();
    playlist.title = title;
    playlist.isPublic = isPublic;
    this.playlists.add(playlist);
    return playlist.save();
  }

  isConnected(){
    return this.connected && !this.isNew();
  }
}

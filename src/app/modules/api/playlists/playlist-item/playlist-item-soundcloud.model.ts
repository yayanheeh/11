import {TrackSoundcloudModel} from '../../tracks/track-soundcloud.model';
import {SoundcloudProxyModel} from '../../soundcloud/soundcloud-proxy.model';
import {IPlaylistItem} from './playlist-item.interface';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../../backbone/decorators/nested.decorator';
import {PlaylistItemsSoundcloudCollection} from './playlist-items-soundcloud.collection';
import {defaultValue} from '../../../backbone/decorators/default-value.decorator';

export class PlaylistItemSoundcloudModel
  extends SoundcloudProxyModel implements IPlaylistItem {

  collection: PlaylistItemsSoundcloudCollection<PlaylistItemSoundcloudModel>;

  public type = 'soundcloud';

  @attributesKey('track')
  @nested()
  track: TrackSoundcloudModel;

  @attributesKey('created')
  @defaultValue(0)
  created: number;

  parse(attributes) {

    if (!attributes.track) {
      return {
        track: attributes
      };
    } else {
      return attributes;
    }
  }

  setEndpoint(playlistId: number) {
    this.endpoint = `/playlists/${playlistId}`;
  }

  destroy() {
    if (this.collection) {
      const collection = this.collection;
      collection.remove(this);
      return collection.triggerSave(this);
    }
  }

  save() {
    if (this.collection) {
      this.collection.add(this.toJSON(), {merge: true});
      return this.collection.triggerSave(this);
    }
  }

  compose(attributes) {
    return {
      id: this.track.id
    };
  }

  initialize() {
    if (this.track.id) {
      this.set('id', this.track.id);
    }

    this.track.on('change:id', () => {
      this.set('id', this.track.id);
    });
  }

}

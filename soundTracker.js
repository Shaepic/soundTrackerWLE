import {Component, Property} from '@wonderlandengine/api';

/**
 * soundTracker for Wonderland Engine by Tristan John. |MIT Lisence|
 * Transforms an empty object with an accompanying audio-source component (ideally)
 * Tracks a designated target empty to be placed in player space (ideally).
 * Parameters define which axes to track for/along, how far along and in which direction or either(signed).
 * A signed axis overides positive or negative direction tracking.
 * Positive tracking overides negative, negative is default.
 * Axes are World Space.
 *
 * grabStartPos sets the reset postion to object's start-time position(default reset position is world-space 0).
 * controlSource allows the soundTracker to toggle the accompanying audio-source when turning on, off or restting.
 * on() turns tracking on: parameter 1 resets positon or not| parameter 2 plays audio source or not.
 * off() turns tracking off: parameter 1 resets positon or not| parameter 2 stops audio source or not.
 * reset()resets positon: paramater 1 toggles tracking | parameter 2 resets audio source or not.
 *
 * In normal operation, sound sources will go from spatial to perceived stereo(or mono) when within tracking range.
 * Performance is typically excellent but is ultimately dependent on ambient javascript load. 
 */
 
export class SoundTracker extends Component {
    static TypeName = 'soundTracker';
    /* Properties that are configurable in the editor */
    static Properties = {
    	target: Property.object(),
        trackforX: Property.bool(),
        trackforY: Property.bool(),
        trackforZ: Property.bool(),
        grabStartPos: Property.bool(true),
        LX: Property.float(10.),
        LY: Property.float(10.),
        LZ: Property.float(10.),
        sineX: Property.bool(false),
        sineY: Property.bool(false),
        sineZ: Property.bool(false),
        posX: Property.bool(false),
        posY: Property.bool(false),
        posZ: Property.bool(false),
        running: Property.bool(true),
        controlSource: Property.bool(false),
    };
    init(){
    	this.sPos = [0.,0.,0.];
        if (this.grabStartPos) this.object.getPositionWorld(this.sPos);
        this.cPos = [];
        this.object.getPositionWorld(this.cPos);
        this.tPos = [];
        this.target.getPositionWorld(this.tPos);
        this.uPos = [0,0,0];
        this.object.getPositionWorld(this.uPos);
    }
    start() {
    }
    update() {
    	if(this.running){
    		this.object.getPositionWorld(this.cPos);
    		this.target.getPositionWorld(this.tPos);
        	if (this.trackforX){
        		if (this.cPos[0] != this.tPos[0]){
					if(this.sineX){
						if (Math.abs(this.tPos[0]-this.sPos[0]) < this.LX){
							this.uPos[0] = this.tPos[0];
						}
					} else {
						if (this.posX){
							if (this.tPos[0] > this.sPos[0] && this.tPos[0] < (this.sPos[0]+this.LX)){
								this.uPos[0] = this.tPos[0];
							}
						} else {
							if (this.tPos[0] < this.sPos[0] && this.tPos[0] > (this.sPos[0]-this.LX)){
								this.uPos[0] = this.tPos[0];
							}
						}
						
					}
				}
        	}
        	if (this.trackforY){
        		if (this.cPos[1] != this.tPos[1]){
					if(this.sineY){
						if (Math.abs(this.tPos[1]-this.sPos[1]) < this.LY){
							this.uPos[1] = this.tPos[1];
						}
					} else {
						if (this.posY){
							if (this.tPos[1] > this.sPos[1] && this.tPos[1] < (this.sPos[1]+this.LY)){
								this.uPos[1] = this.tPos[1];
							}
						} else {
							if (this.tPos[1] < this.sPos[1] && this.tPos[1] > (this.sPos[1]-this.LY)){
								this.uPos[1] = this.tPos[1];
							}
						}
						
					}
				}
        	}
        	if (this.trackforZ){
        		if (this.cPos[2] != this.tPos[2]){
					if(this.sineZ){
						if (Math.abs(this.tPos[2]-this.sPos[2]) < this.LZ){
							this.uPos[2] = this.tPos[2];
						}
					} else {
						if (this.posZ){
							if (this.tPos[2] > this.sPos[2] && this.tPos[2] < (this.sPos[2]+this.LZ)){
								this.uPos[2] = this.tPos[2];
							}
						} else {
							if (this.tPos[2] < this.sPos[2] && this.tPos[2] > (this.sPos[2]-this.LZ)){
								this.uPos[2] = this.tPos[2];
							}
						}
						
					}
				}
        	}
        	this.object.setPositionWorld(this.uPos);
        }
    }
    on(re = false, source = true){
    	if (this.running) return;
    	if (source && this.controlSource) this.object.getComponent('audio-source').play();
    	if (re) {
    		this.object.setPositionWorld(this.sPos);
    		this.object.getPositionWorld(this.tPos);
    		this.object.getPositionWorld(this.cPos);
    		this.object.getPositionWorld(this.uPos);
    		}
    	this.running = true;
    }
    off(re = false, source = true){
    	if (!this.running) return;
    	this.running = false;
    	if (source && this.controlSource) this.object.getComponent('audio-source').stop();
    	if (re) {
    		this.object.setPositionWorld(this.sPos);
    		this.object.getPositionWorld(this.tPos);
    		this.object.getPositionWorld(this.cPos);
    		this.object.getPositionWorld(this.uPos);
    		}
    }
    reset(tog = false, source = false){
    	this.object.setPositionWorld(this.sPos);
    	this.object.getPositionWorld(this.tPos);
    	this.object.getPositionWorld(this.cPos);
    	this.object.getPositionWorld(this.uPos);
    	if (source && this.controlSource) {
    		this.object.getComponent('audio-source').stop();
    		this.object.getComponent('audio-source').play();
    	}
    	if (tog) {
    		if (!this.running) {
    			this.running = true;
    			return;
    		}
    	}
    	if (!tog) {
    		if (this.running) {
    			this.running = false;
    			return;
    		}
    	}
    }
}

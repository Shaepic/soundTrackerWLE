import {Component, Property} from '@wonderlandengine/api';

/**
 * soundTarget for Wonderland Engine by Tristan John. |MIT Lisence|
 * Properly positions a target empty to be tracked by a soundTracker source.
 * Target empty should be placed(ideally) in the Player local space with BOTH eyes linked
 * to their corresponding component Eye parameters.
 *
 * setTime parameter sets the wait period before the Target positions itself after entering an XR session(in seconds).
 * offset offsets the targets positioning after self-placement along the forward and height axes. 
 */
export class SoundTarget extends Component {
    static TypeName = 'soundTarget';
    static Properties = {
        Eye1: Property.object(),
        Eye2: Property.object(),
        setTime: Property.float(2),
        log: Property.bool(false),
        offset: Property.float(-0.3),
    };
    start() {
        this.engine.onXRSessionStart.add(() => {
        	setTimeout(()=>{
        		let p1 = [];
        		let p2 = [];
        		let hw = [];
        		this.Eye1.getPositionLocal(p1);
        		this.Eye2.getPositionLocal(p2);
        		hw[1] = p1[1];
        		hw[0] = (p2[0]-p1[0])/2;
        		hw[2] = (p2[2]-p1[2])/2;
        		this.object.setPositionLocal(hw);
        		this.object.parent = this.Eye1;
        		this.object.translateLocal([0,this.offset,this.offset]);
        		console.log('Sound Target Placed');
        	},this.setTime*1000);
        });
    }
}

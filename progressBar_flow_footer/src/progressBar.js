import { LightningElement, api } from 'lwc';
import { FlowNavigationNextEvent, FlowNavigationBackEvent, FlowNavigationFinishEvent } from 'lightning/flowSupport';

export default class ProgressBar extends LightningElement {
    @api showNext = false;
    @api showPrevious = false;
    @api labelNext = 'Next';
    @api labelPrevious = 'Previous';
    @api variantPrevious = 'neutral';
    @api variantNext = 'brand';
    @api stages = [];
    @api currentStage = '';
    @api availableActions = [];
    @api flowType =  'flowAction';

    get _showStages() {
        return this.stages.length > 0 && this.currentStage.length > 0;
    }

    get _isNextDisabled() {
        return !this._canNext();
    }

    get _isBackDisabled() {
        return !this._canBack();
    }

    get _footerClass() {
        return this.flowType === 'flowAction' ? 'modal-footer slds-modal__footer lwc-flow-footer' : 'slds-card__footer';
    }

    _canNext() {
        return this.availableActions.find(action => action === 'NEXT') || this.availableActions.find(action => action === 'FINISH');
    }

    _canBack() {
        return this.availableActions.find(action => action === 'BACK');
    }

    handleNext() {
        if (this.availableActions.find(action => action === 'NEXT')) {
            this.dispatchEvent(new FlowNavigationNextEvent());
        } else {
            this.dispatchEvent(new FlowNavigationFinishEvent());
        }
    }

    handleBack() {
        this.dispatchEvent(new FlowNavigationBackEvent());
    }
}
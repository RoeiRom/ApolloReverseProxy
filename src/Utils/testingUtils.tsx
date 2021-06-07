import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

const TestHooksComponent = ({ callback }: any): null => {
    callback();
    return null;
}

class TestHookComponentBuilder {
    _builtComponent: TestHookComponent;

    constructor (componentToBuild: TestHookComponent) {
        this._builtComponent = componentToBuild;
    };

    dbMocks(mocks: MockedResponse[]) {
        this._builtComponent.setMountedComponent(
            <MockedProvider mocks={mocks} addTypename={false}>
                {this._builtComponent.getMountedComponent()}
            </MockedProvider>
        );

        return this;
    }

    build() {
        return this._builtComponent;
    }

    mount() {
        return this.build().mount();
    }
}

class TestHookComponent {
    _mountedComponent: JSX.Element;

    constructor(hookCallBack: () => void) {
        this._mountedComponent = <TestHooksComponent callback={hookCallBack} />
    }

    build() {
        return new TestHookComponentBuilder(this);
    }

    getMountedComponent() {
        return this._mountedComponent;
    }
    
    setMountedComponent(newComponent: JSX.Element) {
        this._mountedComponent = newComponent;
    }

    mount() {
        return mount(this._mountedComponent);
    }
}

export default TestHookComponent;
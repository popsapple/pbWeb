import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { connect } from 'react-redux';
import DropdownComponent from './DropdownComponent';
import ButtonToolbarComponent from './ButtonToolbarComponent';


import ThemeControllbutton from './ThemeControllbutton';


export default class SideDesignObjectTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
	render(){
        this.store = this.context;
        return (
            <div>
                <div className="desigin_objects">
                    <ul>
                        <li>
                            <button>
                                <img src="" alt="돋보기" />
                                <span>검색</span>
                            </button>
                        </li>
                        <li>
                            <button>
                                <img src="" alt="템플릿" />
                                <span>템플릿</span>
                            </button>
                        </li>
                        <li>
                            <button>
                                <img src="" alt="요소" />
                                <span>요소</span>
                            </button>
                        </li>
                        <li>
                            <button>
                                <img src="" alt="텍스트" />
                                <span>텍스트</span>
                            </button>
                        </li>
                        <li>
                            <button>
                                <img src="" alt="업로드" />
                                <span>업로드</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
SideDesignObjectTab.contextTypes = {
    store: PropTypes.object
}
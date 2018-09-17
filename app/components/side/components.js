import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { connect } from 'react-redux';
import DropdownComponent from './DropdownComponent';
import ButtonToolbarComponent from './ButtonToolbarComponent';


import ThemeControllbutton from './ThemeControllbutton';
import TemplateList from './TemplateList';
import ComponentLogo from './ComponentLogo';
import ComponentCompanyName from './ComponentCompanyName';
import ComponentTelLink from './ComponentTelLink';


export default class SideComponentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedThemeIdx: 0,
            themes: [
                {
                    name: 'Bank',
                    category: 'NameCard',
                    nameKor: '증권',
                    responseStyle: false,
                    controllButton: <ThemeControllbutton name='Bank' category='NameCard' nameKor='증권' key={Math.random()} />,
                    templateList: [
                        <TemplateList type='namecard_template_style01' key={Math.random()} name='세로형템플릿01'/>,
                        <TemplateList type='namecard_template_style02' key={Math.random()} name='가로형템플릿01' />,
                        <TemplateList type='namecard_template_style03' key={Math.random()} name='가로형템플릿02' />,
                        <TemplateList type='namecard_template_style04' key={Math.random()} name='가로형템플릿03' />,
                        <TemplateList type='namecard_template_style05' key={Math.random()} name='세로형템플릿02' />
                    ],
                    componentList: [
                        <ComponentLogo type='namecard_logo_style01' key={Math.random()} />,
                        <ComponentLogo type='namecard_logo_style02' key={Math.random()} />,
                        <ComponentLogo type='namecard_logo_style03' key={Math.random()} />,
                        <ComponentCompanyName type='namecard_companyname_style01' key={Math.random()} />,
                        <ComponentTelLink type='namecard_tellink_style01' key={Math.random()} />
                    ]
                },
                {
                    name: 'Wedding',
                    category: 'NameCard',
                    nameKor: '결혼',
                    responseStyle: false,
                    controllButton: <ThemeControllbutton name='Wedding' category='NameCard' nameKor='결혼' key={Math.random()} />,
                    templateList: [
                        <TemplateList type='namecard_template_style06' key={Math.random()} name='가로형템플릿01' />,
                        <TemplateList type='namecard_template_style07' key={Math.random()} name='가로형템플릿02' />
                    ],
                    componentList: [
                        <ComponentLogo type='namecard_logo_style04' key={Math.random()} />,
                        <ComponentTelLink type='namecard_tellink_style02' key={Math.random()} />
                    ]
                },
                {
                    name: 'School',
                    category: 'NameCard',
                    nameKor: '학교',
                    responseStyle: false,
                    controllButton: <ThemeControllbutton name='School' category='NameCard' nameKor='학교' key={Math.random()} />,
                    templateList: [
                        <TemplateList type='namecard_template_style08' key={Math.random()} name='가로형템플릿01' />,
                        <TemplateList type='namecard_template_style09' key={Math.random()} name='가로형템플릿02' />
                    ],
                    componentList: [
                        <ComponentLogo type='namecard_logo_style05' key={Math.random()} />,
                        <ComponentTelLink type='namecard_tellink_style03' key={Math.random()} />
                    ]
                }
            ]
        }

        this.selected_theme = this.state.themes[this.state.selectedThemeIdx];
    }
	render(){
        this.store = this.context;
        return (
            <div>
                <div className="controller_box">
                    <ul className="controller_list">
                        <li>
                            <button>Theme</button>
                        </li>
                        <li>
                            <button>Component</button>
                        </li>
                        {/*<li>
                            <button>Background</button>
                        </li>
                        <li>
                            <button>Share</button>
                        </li>*/}
                    </ul>
                </div>
                <div className="themeslist_box">
                    <ul>
                        {
                            this.selected_theme.templateList.map((arr,idx)=>{
                                return (arr);
                            })
                        }
                    </ul>
                </div>
                <div className="componentlist_box">
                    <ul>
                        {
                            this.selected_theme.componentList.map((arr,idx)=>{
                                return (arr);
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
SideComponentList.contextTypes = {
    store: PropTypes.object
}
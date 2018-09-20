import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { connect } from 'react-redux';
import DropdownComponent from './DropdownComponent';
import ButtonToolbarComponent from './ButtonToolbarComponent';

import SearchThemeList from './SearchThemeList';

import ThemeControllbutton from './ThemeControllbutton';
import TemplateList from './TemplateList';
import ComponentImage from './ComponentImage';
import ComponentLayout from './ComponentLayout';
import ComponentGird from './ComponentGird';
import ComponentLine from './ComponentLine';
import ComponentPolygon from './ComponentPolygon';
import ComponentChart from './ComponentChart';
import TemplateListGroup from './TemplateListGroup';


export default class SideDesignObjectList extends React.Component {
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
                        <ComponentImage type='is_title component_image' key={Math.random()} />,
                        <ComponentGird type='is_title component_grid' key={Math.random()} />,
                        <ComponentPolygon type='is_title component_polygon' key={Math.random()} />,
                        <ComponentLine type='is_title component_line' key={Math.random()} />,
                        <ComponentChart type='is_title component_chart' key={Math.random()} />,
                        <ComponentLayout type='is_title component_layout' key={Math.random()} />
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
                        <ComponentImage type='is_title component_image' key={Math.random()} />,
                        <ComponentGird type='is_title component_grid' key={Math.random()} />,
                        <ComponentPolygon type='is_title component_polygon' key={Math.random()} />,
                        <ComponentLine type='is_title component_line' key={Math.random()} />,
                        <ComponentChart type='is_title component_chart' key={Math.random()} />,
                        <ComponentLayout type='is_title component_layout' key={Math.random()} />
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
                        <ComponentImage type='is_title component_image' key={Math.random()} />,
                        <ComponentGird type='is_title component_grid' key={Math.random()} />,
                        <ComponentPolygon type='is_title component_polygon' key={Math.random()} />,
                        <ComponentLine type='is_title component_line' key={Math.random()} />,
                        <ComponentChart type='is_title component_chart' key={Math.random()} />,
                        <ComponentLayout type='is_title component_layout' key={Math.random()} />
                    ]
                }
            ]
        }

        this.selected_theme = this.state.themes[this.state.selectedThemeIdx];
    }

    SearchTheme(idx){
        this.setState({
            selectedThemeIdx : idx
        },()=>{
            this.setState({
                selectedThemeIdx : idx
            });
            this.selected_theme = this.state.themes[this.state.selectedThemeIdx];
        });
    }
	render(){
        this.store = this.context;
        return (
            <div>
                <div className="themeslist_box list_box active">
                    <SearchThemeList ChangeList={this.SearchTheme.bind(this)} />
                    <TemplateListGroup list={this.selected_theme.templateList} />
                </div>
                <div className="componentlist_box list_box">
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
SideDesignObjectList.contextTypes = {
    store: PropTypes.object
}
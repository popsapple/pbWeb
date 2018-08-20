import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'

export default class SideComponent extends React.Component{
    render(){
        return(
            <div>
                <nav class="collapse bd-links" id="bd-docs-nav"><div class="bd-toc-item active">
                    <a class="bd-toc-link" href="/docs/4.1/getting-started/introduction/">
                        Getting started
                    </a>

                    <ul class="nav bd-sidenav"><li class="active bd-sidenav-active">
                            <a href="/docs/4.1/getting-started/introduction/">
                            Introduction
                            </a></li><li>
                            <a href="/docs/4.1/getting-started/download/">
                            Download
                            </a></li><li>
                            <a href="/docs/4.1/getting-started/contents/">
                            Contents
                            </a></li><li>
                            <a href="/docs/4.1/getting-started/browsers-devices/">
                            Browsers & devices
                            </a></li><li>
                            <a href="/docs/4.1/getting-started/javascript/">
                            JavaScript
                            </a></li><li>
                            <a href="/docs/4.1/getting-started/theming/">
                            Theming
                            </a></li><li>
                            <a href="/docs/4.1/getting-started/build-tools/">
                            Build tools
                            </a></li><li>
                            <a href="/docs/4.1/getting-started/webpack/">
                            Webpack
                            </a></li><li>
                            <a href="/docs/4.1/getting-started/accessibility/">
                            Accessibility
                            </a></li></ul>
                    </div><div class="bd-toc-item">
                    <a class="bd-toc-link" href="/docs/4.1/layout/overview/">
                        Layout
                    </a>

                    <ul class="nav bd-sidenav"><li>
                            <a href="/docs/4.1/layout/overview/">
                            Overview
                            </a></li><li>
                            <a href="/docs/4.1/layout/grid/">
                            Grid
                            </a></li><li>
                            <a href="/docs/4.1/layout/media-object/">
                            Media object
                            </a></li><li>
                            <a href="/docs/4.1/layout/utilities-for-layout/">
                            Utilities for layout
                            </a></li></ul>
                    </div><div class="bd-toc-item">
                    <a class="bd-toc-link" href="/docs/4.1/content/reboot/">
                        Content
                    </a>

                    <ul class="nav bd-sidenav"><li>
                            <a href="/docs/4.1/content/reboot/">
                            Reboot
                            </a></li><li>
                            <a href="/docs/4.1/content/typography/">
                            Typography
                            </a></li><li>
                            <a href="/docs/4.1/content/code/">
                            Code
                            </a></li><li>
                            <a href="/docs/4.1/content/images/">
                            Images
                            </a></li><li>
                            <a href="/docs/4.1/content/tables/">
                            Tables
                            </a></li><li>
                            <a href="/docs/4.1/content/figures/">
                            Figures
                            </a></li></ul>
                    </div>
                </nav>
            </div>
        )
    }
    
}
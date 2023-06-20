import {Divider, Text} from '@rneui/themed'
import React from 'react'
import {FlatList} from 'react-native'

interface OpenSourceInfo {
  libraryName: string
  version: string
  _license: string
  _description: string
  homepage: string
  repository: {type?: string; url?: string}
  author?: {name?: string, email?:string, url?: string}
  _licenseContent: string
}

const source = [
  {
    libraryName: '@miblanchard/react-native-slider',
    version: '2.3.0',
    _license: 'MIT',
    _description: 'A pure JavaScript <Slider /> component for react-native',
    homepage: 'https://github.com/miblanchard/react-native-slider#readme',
    repository: {type: 'git', url: 'git+ssh://git@github.com/miblanchard/react-native-slider.git'},
    _licenseContent:
      'MIT License\n\nCopyright (c) 2019-present Michael Blanchard\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: '@react-native-async-storage/async-storage',
    version: '1.17.7',
    _license: 'MIT',
    _description: 'Asynchronous, persistent, key-value storage system for React Native.',
    homepage: 'https://github.com/react-native-async-storage/async-storage#readme',
    author: {name: 'Krzysztof Borowy', email: 'hello@krizzu.dev'},
    repository: {
      type: 'git',
      url: 'git+https://github.com/react-native-async-storage/async-storage.git',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2015-present, Facebook, Inc.\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.',
  },
  {
    libraryName: '@react-navigation/bottom-tabs',
    version: '6.3.3',
    _license: 'MIT',
    _description: 'Bottom tab navigator following iOS design guidelines',
    homepage: 'https://github.com/react-navigation/react-navigation#readme',
    repository: {
      type: 'git',
      url: 'git+https://github.com/react-navigation/react-navigation.git',
      directory: 'packages/bottom-tabs',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2017 React Navigation Contributors\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: '@react-navigation/elements',
    version: '1.3.5',
    _license: 'MIT',
    _description: 'UI Components for React Navigation',
    homepage: 'https://reactnavigation.org',
    repository: {
      type: 'git',
      url: 'git+https://github.com/react-navigation/react-navigation.git',
      directory: 'packages/elements',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2017 React Navigation Contributors\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: '@react-navigation/material-top-tabs',
    version: '6.6.0',
    _license: 'MIT',
    _description: 'Integration for the animated tab view component from react-native-tab-view',
    homepage: 'https://reactnavigation.org/docs/material-top-tab-navigator/',
    repository: {
      type: 'git',
      url: 'git+https://github.com/react-navigation/react-navigation.git',
      directory: 'packages/material-top-tabs',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2017 React Navigation Contributors\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: '@react-navigation/native',
    version: '6.0.12',
    _license: 'MIT',
    _description: 'React Native integration for React Navigation',
    homepage: 'https://reactnavigation.org',
    repository: {
      type: 'git',
      url: 'git+https://github.com/react-navigation/react-navigation.git',
      directory: 'packages/native',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2017 React Navigation Contributors\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: '@react-navigation/stack',
    version: '6.2.3',
    _license: 'MIT',
    _description:
      'Stack navigator component for iOS and Android with animated transitions and gestures',
    homepage: 'https://reactnavigation.org/docs/stack-navigator/',
    repository: {
      type: 'git',
      url: 'git+https://github.com/react-navigation/react-navigation.git',
      directory: 'packages/stack',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2017 React Navigation Contributors\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: '@reduxjs/toolkit',
    version: '1.9.2',
    _license: 'MIT',
    _description:
      'The official, opinionated, batteries-included toolset for efficient Redux development',
    homepage: 'https://redux-toolkit.js.org',
    author: {name: 'Mark Erikson', email: 'mark@isquaredsoftware.com'},
    repository: {type: 'git', url: 'git+https://github.com/reduxjs/redux-toolkit.git'},
    _licenseContent:
      'MIT License\r\n\r\nCopyright (c) 2018 Mark Erikson\r\n\r\nPermission is hereby granted, free of charge, to any person obtaining a copy\r\nof this software and associated documentation files (the "Software"), to deal\r\nin the Software without restriction, including without limitation the rights\r\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\ncopies of the Software, and to permit persons to whom the Software is\r\nfurnished to do so, subject to the following conditions:\r\n\r\nThe above copyright notice and this permission notice shall be included in all\r\ncopies or substantial portions of the Software.\r\n\r\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r\nSOFTWARE.\r\n',
  },
  {
    libraryName: '@rneui/base',
    version: '4.0.0-rc.6',
    _license: 'MIT',
    _description: 'Cross Platform React Native UI Toolkit',
    homepage: 'https://reactnativeelements.com/',
    author: {name: 'RNE Core Team'},
    repository: {
      type: 'git',
      url: 'git+https://github.com/react-native-elements/react-native-elements.git',
      directory: 'packages/base',
    },
  },
  {
    libraryName: '@rneui/themed',
    version: '4.0.0-rc.6',
    _license: 'MIT',
    _description: 'Cross Platform React Native UI Toolkit',
    homepage: 'https://reactnativeelements.com/',
    author: {name: 'RNE Core Team'},
    repository: {
      type: 'git',
      url: 'git+https://github.com/react-native-elements/react-native-elements.git',
      directory: 'packages/themed',
    },
  },
  {
    libraryName: 'axios',
    version: '1.2.3',
    _license: 'MIT',
    _description: 'Promise based HTTP client for the browser and node.js',
    homepage: 'https://axios-http.com',
    author: {name: 'Matt Zabriskie'},
    repository: {type: 'git', url: 'git+https://github.com/axios/axios.git'},
    _licenseContent:
      '# Copyright (c) 2014-present Matt Zabriskie & Collaborators\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n',
  },
  {
    libraryName: 'babel-plugin-module-resolver',
    version: '4.1.0',
    _license: 'MIT',
    _description: 'Module resolver plugin for Babel',
    homepage: 'https://github.com/tleunen/babel-plugin-module-resolver#readme',
    author: {name: 'Tommy Leunen', email: 'tommy.leunen@gmail.com', url: 'http://tommyleunen.com'},
    repository: {
      type: 'git',
      url: 'git+https://github.com/tleunen/babel-plugin-module-resolver.git',
    },
    _licenseContent:
      'The MIT License (MIT)\n\nCopyright (c) 2015 Tommy Leunen <tommy.leunen@gmail.com> (tommyleunen.com)\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in\nall copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\nTHE SOFTWARE.\n',
  },
  {
    libraryName: 'mobx-react',
    version: '7.5.2',
    _license: 'MIT',
    _description: 'React bindings for MobX. Create fully reactive components.',
    homepage: 'https://mobx.js.org',
    author: {name: 'Michel Weststrate'},
    repository: {type: 'git', url: 'git+https://github.com/mobxjs/mobx.git'},
    _licenseContent:
      'The MIT License (MIT)\n\nCopyright (c) 2015 Michel Weststrate\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'pod-install',
    version: '0.1.38',
    _license: 'MIT',
    _description: 'Ensure CocoaPods are installed in your project',
    homepage: 'https://github.com/expo/expo-cli/tree/main/packages/pod-install',
    author: {name: 'Expo', email: 'support@expo.dev'},
    repository: {type: 'git', url: 'git+https://github.com/expo/expo-cli.git'},
    _licenseContent:
      'The MIT License (MIT)\n\nCopyright (c) 2020-present 650 Industries, Inc. (aka Expo)\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n\n',
  },
  {
    libraryName: 'react',
    version: '18.0.0',
    _license: 'MIT',
    _description: 'React is a JavaScript library for building user interfaces.',
    homepage: 'https://reactjs.org/',
    repository: {
      type: 'git',
      url: 'git+https://github.com/facebook/react.git',
      directory: 'packages/react',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) Facebook, Inc. and its affiliates.\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-native',
    version: '0.69.3',
    _license: 'MIT',
    _description: 'A framework for building native apps using React',
    homepage: 'https://github.com/facebook/react-native#readme',
    repository: {type: 'git', url: 'git+https://github.com/facebook/react-native.git'},
    _licenseContent:
      'MIT License\n\nCopyright (c) Meta Platforms, Inc. and affiliates.\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-native-date-picker',
    version: '4.2.5',
    _license: 'MIT',
    _description:
      'A datetime picker for React Native. In-modal or inlined. Supports Android and iOS.',
    homepage: 'https://github.com/henninghall/react-native-date-picker',
    author: {name: 'henninghall'},
    repository: {
      type: 'git',
      url: 'git+ssh://git@github.com/henninghall/react-native-date-picker.git',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2018 Henning Hall\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-native-document-picker',
    version: '8.1.3',
    _license: 'MIT',
    _description:
      'A react native interface to access documents from dropbox, google drive, iCloud...',
    homepage: 'https://github.com/rnmods/react-native-document-picker#readme',
    author: {name: 'Elyx0', email: 'elyx00@gmail.com', url: 'https://github.com/rnmods'},
    repository: {
      type: 'git',
      url: 'git+https://github.com/rnmods/react-native-document-picker.git',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2016 Elyx0\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-native-dropdown-select-list',
    version: '2.0.4',
    _license: 'MIT',
    _description: '⭐ React Native Select List Equivalent to Html\'s Select with options"',
    homepage: 'https://github.com/danish1658/react-native-dropdown-select-list#readme',
    author: {name: 'Danish Amin Dar'},
    repository: {
      type: 'git',
      url: 'git+https://github.com/danish1658/react-native-dropdown-select-list.git',
    },
    _licenseContent:
      'MIT License\r\n\r\nCopyright (c) 2022 danish1658\r\n\r\nPermission is hereby granted, free of charge, to any person obtaining a copy\r\nof this software and associated documentation files (the "Software"), to deal\r\nin the Software without restriction, including without limitation the rights\r\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\ncopies of the Software, and to permit persons to whom the Software is\r\nfurnished to do so, subject to the following conditions:\r\n\r\nThe above copyright notice and this permission notice shall be included in all\r\ncopies or substantial portions of the Software.\r\n\r\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r\nSOFTWARE.\r\n',
  },
  {
    libraryName: 'react-native-gesture-handler',
    version: '2.9.0',
    _license: 'MIT',
    _description:
      'Experimental implementation of a new declarative API for gesture handling in react-native',
    homepage: 'https://github.com/software-mansion/react-native-gesture-handler#readme',
    author: {name: 'Krzysztof Magiera', email: 'krzys.magiera@gmail.com'},
    repository: {
      type: 'git',
      url: 'git+https://github.com/software-mansion/react-native-gesture-handler.git',
    },
    _licenseContent:
      'The MIT License (MIT)\n\nCopyright (c) 2016 Software Mansion <swmansion.com>\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-native-pager-view',
    version: '6.1.4',
    _license: 'MIT',
    _description: 'React Native wrapper for Android and iOS ViewPager',
    homepage: 'https://github.com/callstack/react-native-pager-view#readme',
    author: {name: 'troZee', email: 'hello@callstack.com', url: 'https://github.com/callstack'},
    repository: {type: 'git', url: 'git+https://github.com/callstack/react-native-pager-view.git'},
    _licenseContent:
      'MIT License\n\nCopyright (c) 2021 Callstack\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-native-safe-area-context',
    version: '4.3.3',
    _license: 'MIT',
    _description: 'A flexible way to handle safe area, also works on Android and web.',
    homepage: 'https://github.com/th3rdwave/react-native-safe-area-context#readme',
    author: {name: 'Janic Duplessis', email: 'janicduplessis@gmail.com'},
    repository: {
      type: 'git',
      url: 'git+https://github.com/th3rdwave/react-native-safe-area-context.git',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2019 Th3rd Wave\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-native-screens',
    version: '3.17.0',
    _license: 'MIT',
    _description: 'Native navigation primitives for your React Native app.',
    homepage: 'https://github.com/software-mansion/react-native-screens#readme',
    author: {name: 'Krzysztof Magiera', email: 'krzys.magiera@gmail.com'},
    repository: {
      type: 'git',
      url: 'git+https://github.com/software-mansion/react-native-screens.git',
    },
    _licenseContent:
      'The MIT License (MIT)\n\nCopyright (c) 2018 Software Mansion <swmansion.com>\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-native-splash-screen',
    version: '3.3.0',
    _license: 'MIT',
    _description:
      'A splash screen for react-native, hide when application loaded ,it works on iOS and Android.',
    homepage: 'https://github.com/crazycodeboy/react-native-splash-screen#readme',
    author: {name: 'crazycodeboy'},
    repository: {
      type: 'git',
      url: 'git+https://github.com/crazycodeboy/react-native-splash-screen.git',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2016 Jia PengHui\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-native-svg',
    version: '13.8.0',
    _license: 'MIT',
    _description: 'SVG library for react-native',
    homepage: 'https://github.com/react-native-community/react-native-svg',
    repository: {
      type: 'git',
      url: 'git+https://github.com/react-native-community/react-native-svg.git',
    },
    _licenseContent:
      'The MIT License (MIT)\n\nCopyright (c) [2015-2016] [Horcrux]\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-native-vector-icons',
    version: '9.2.0',
    _license: 'MIT',
    _description:
      'Customizable Icons for React Native with support for NavBar/TabBar, image source and full styling.',
    homepage: 'https://github.com/oblador/react-native-vector-icons',
    author: {name: 'Joel Arvidsson', email: 'joel@oblador.se'},
    repository: {type: 'git', url: 'git://github.com/oblador/react-native-vector-icons.git'},
    _licenseContent:
      'The MIT License (MIT)\n\nCopyright (c) 2015 Joel Arvidsson\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n\n',
  },
  {
    libraryName: 'react-native-webview',
    version: '11.26.1',
    _license: 'MIT',
    _description: 'React Native WebView component for iOS, Android, macOS, and Windows',
    homepage: 'https://github.com/react-native-webview/react-native-webview#readme',
    author: {name: 'Jamon Holmgren', email: 'jamon@infinite.red'},
    repository: {
      type: 'git',
      url: 'git+https://github.com/react-native-webview/react-native-webview.git',
    },
    _licenseContent:
      'MIT License\n\nCopyright (c) 2015-present, Facebook, Inc.\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-query',
    version: '3.39.3',
    _license: 'MIT',
    _description: 'Hooks for managing, caching and syncing asynchronous and remote data in React',
    homepage: 'https://github.com/tannerlinsley/react-query#readme',
    author: {name: 'tannerlinsley'},
    repository: {type: 'git', url: 'git+https://github.com/tannerlinsley/react-query.git'},
    _licenseContent:
      'MIT License\n\nCopyright (c) 2019 Tanner Linsley\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'react-redux',
    version: '8.0.5',
    _license: 'MIT',
    _description: 'Official React bindings for Redux',
    homepage: 'https://github.com/reduxjs/react-redux',
    author: {name: 'Dan Abramov', email: 'dan.abramov@me.com', url: 'https://github.com/gaearon'},
    repository: {type: 'git', url: 'git+https://github.com/reduxjs/react-redux.git'},
    _licenseContent:
      'The MIT License (MIT)\r\n\r\nCopyright (c) 2015-present Dan Abramov\r\n\r\nPermission is hereby granted, free of charge, to any person obtaining a copy\r\nof this software and associated documentation files (the "Software"), to deal\r\nin the Software without restriction, including without limitation the rights\r\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\ncopies of the Software, and to permit persons to whom the Software is\r\nfurnished to do so, subject to the following conditions:\r\n\r\nThe above copyright notice and this permission notice shall be included in all\r\ncopies or substantial portions of the Software.\r\n\r\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r\nSOFTWARE.\r\n',
  },
  {
    libraryName: 'redux',
    version: '4.2.0',
    _license: 'MIT',
    _description: 'Predictable state container for JavaScript apps',
    homepage: 'http://redux.js.org',
    repository: {type: 'git', url: 'git+https://github.com/reduxjs/redux.git'},
    _licenseContent:
      'The MIT License (MIT)\n\nCopyright (c) 2015-present Dan Abramov\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
  {
    libraryName: 'redux-logger',
    version: '3.0.6',
    _license: 'MIT',
    _description: 'Logger for Redux',
    homepage: 'https://github.com/theaqua/redux-logger#readme',
    author: {name: 'Eugene Rodionov', url: 'https://github.com/theaqua'},
    repository: {type: 'git', url: 'git+https://github.com/theaqua/redux-logger.git'},
    _licenseContent:
      'Copyright (c) 2016 Eugene Rodionov\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in\nall copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\nTHE SOFTWARE.\n',
  },
  {
    libraryName: 'redux-thunk',
    version: '2.4.2',
    _license: 'MIT',
    _description: 'Thunk middleware for Redux.',
    homepage: 'https://github.com/reduxjs/redux-thunk',
    author: {name: 'Dan Abramov', email: 'dan.abramov@me.com'},
    repository: {type: 'git', url: 'git+https://github.com/reduxjs/redux-thunk.git'},
    _licenseContent:
      'The MIT License (MIT)\r\n\r\nCopyright (c) 2015-present Dan Abramov\r\n\r\nPermission is hereby granted, free of charge, to any person obtaining a copy\r\nof this software and associated documentation files (the "Software"), to deal\r\nin the Software without restriction, including without limitation the rights\r\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\ncopies of the Software, and to permit persons to whom the Software is\r\nfurnished to do so, subject to the following conditions:\r\n\r\nThe above copyright notice and this permission notice shall be included in all\r\ncopies or substantial portions of the Software.\r\n\r\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r\nSOFTWARE.\r\n',
  },
  {
    libraryName: 'typesafe-actions',
    version: '5.1.0',
    _license: 'MIT',
    _description: 'Typesafe Action Creators for Redux / Flux Architectures (in TypeScript)',
    homepage: 'https://github.com/piotrwitek/typesafe-actions',
    author: {
      name: 'Piotr Witek',
      email: 'piotrek.witek@gmail.com',
      url: 'http://piotrwitek.github.io',
    },
    repository: {type: 'git', url: 'git+https://github.com/piotrwitek/typesafe-actions.git'},
    _licenseContent:
      'MIT License\n\nCopyright (c) 2017 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n',
  },
] as OpenSourceInfo[]

export default function OpenSourceLicense() {
  const renderItem = ({item}: {item: OpenSourceInfo}) => {
    return (
      <>
        <Text h4>{item.libraryName}</Text>
        <Text>{item.version}</Text>
        <Text>{item._license}</Text>
        <Text>{item._description}</Text>
        <Text>{item._licenseContent}</Text>
        <Divider/>
      </>
    )
  }

  return (
    <>
      <FlatList
        data={source}
        renderItem={renderItem}
        keyExtractor={item => String(item.libraryName)}
      />
    </>
  )
}

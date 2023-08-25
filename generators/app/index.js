'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('underscore.string');
const { github, git } = require('yeoman-generator/lib/actions/user');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the terrific ${chalk.red('@walts81/node-api-vue')} generator!`));

    return github.username().then(username => {
      const prompts = [
        {
          type: 'string',
          name: 'name',
          message: 'Enter a name for this API:',
          default: 'My Spectacular Node Api',
        },
        {
          type: 'string',
          name: 'desc',
          message: 'Enter a description for this API (optional):',
          default: '',
        },
        {
          type: 'string',
          name: 'author',
          message: `What's your name?`,
          default: git.name() || '',
        },
        {
          type: 'string',
          name: 'email',
          message: `What's your email?`,
          default: git.email() || '',
        },
        {
          type: 'string',
          name: 'githubUser',
          message: 'Enter your github username:',
          default: username || '',
        },
        {
          type: 'string',
          name: 'gitUrl',
          message: 'Enter the url for your git repo (optional):',
          default: '',
        },
        {
          type: 'list',
          name: 'browser',
          message: 'Which browser would you like to use for debugging?',
          choices: [
            { name: 'Chrome', value: 'chrome' },
            { name: 'MS Edge', value: 'msedge' },
          ],
          default: 'chrome',
        },
        {
          type: 'confirm',
          name: 'npmInstall',
          message: 'Would you like the generator to automatically run `npm install`?',
          default: false,
        },
        {
          type: 'confirm',
          name: 'gitInit',
          message: 'Would you like the generator to initialize a git repo?',
          default: false,
        },
      ];

      return this.prompt(prompts).then(props => {
        // To access props later use this.props.someAnswer;
        props.slugged = _.slugify(props.name);
        props.capSlugged = props.slugged.toUpperCase();
        props.title = _.titleize(props.name);
        props.namePrefix = !!props.githubUser ? '@' + props.githubUser + '/' : '';
        props.fullSlugged = props.namePrefix + props.slugged;
        props.year = new Date().getFullYear().toString();
        if (props.author.indexOf(' ') > -1) {
          const names = props.author.split(' ');
          props.firstName = names.length > 0 ? names[0].trim() : '';
          props.lastName = names.length > 1 ? names[1].trim() : '';
        } else {
          props.firstName = props.author || '';
          props.lastName = '';
        }
        props.gitUrl = props.gitUrl || '';
        this.props = props;
        this.destinationRoot(props.slugged);
      });
    });
  }

  writing() {
    this.fs.copy(this.templatePath('_devcontainer/'), this.destinationPath('.devcontainer/'));
    this.fs.copyTpl(this.templatePath('_vscode/*'), this.destinationPath('.vscode/'), this.props);
    this.fs.copyTpl(this.templatePath('root/*'), this.destinationRoot(), this.props);
    this.fs.copyTpl(this.templatePath('sourcecode/'), this.destinationPath('src/'), this.props);
    const serverSrcDotFiles = ['.mocharc.js', '.nycrc.json'];
    serverSrcDotFiles.forEach(x =>
      this.fs.copyTpl(this.templatePath(`sourcecode/server/${x}`), this.destinationPath(`src/server/${x}`), this.props)
    );
    const clientSrcDotFiles = ['.env', '.env.debug', '.env.development', '.mocharc.js', '.nycrc.json'];
    clientSrcDotFiles.forEach(x =>
      this.fs.copyTpl(this.templatePath(`sourcecode/client/${x}`), this.destinationPath(`src/client/${x}`), this.props)
    );
  }

  install() {
    if (this.props.npmInstall) this.npmInstall();
    if (this.props.gitInit) this.spawnCommandSync('git', ['init', '--quiet']);
  }
};

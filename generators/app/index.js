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
          message: 'Enter a description for this API:',
          default: '',
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
          message: 'Enter the url for your git repo:',
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
      ];

      return this.prompt(prompts).then(props => {
        // To access props later use this.props.someAnswer;
        props.slugged = _.slugify(props.name);
        props.capSlugged = props.slugged.toUpperCase();
        props.title = _.titleize(props.name);
        props.namePrefix = !!props.githubUser ? '@' + props.githubUser + '/' : '';
        props.fullSlugged = props.namePrefix + props.slugged;
        props.year = new Date().getFullYear().toString();
        props.VITE_APP_TITLE = '<%= VITE_APP_TITLE %>';
        if (props.author.indexOf(' ') > -1) {
          const names = props.author.split(' ');
          props.firstName = names.length > 0 ? names[0].trim() : '';
          props.lastName = names.length > 1 ? names[1].trim() : '';
        } else {
          props.firstName = props.author || '';
          props.lastName = '';
        }
        this.props = props;
        this.destinationRoot(props.slugged);
      });
    });
  }

  writing() {
    this.fs.copy(this.templatePath('_devcontainer/'), this.destinationPath('.devcontainer/'));
    this.fs.copy(this.templatePath('_vscode/'), this.destinationPath('.vscode/'));
    this.fs.copyTpl(this.templatePath('root/*'), this.destinationRoot(), this.props);
    this.fs.copyTpl(this.templatePath('sourcecode/*'), this.destinationPath('src/'), this.props);
  }

  install() {
    this.npmInstall();
  }
};

import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { SuperPopup, PopupDirection } from '../../../../component/popup/SuperPopup';
import { COLOR } from '../../../../constant/Color';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { ArrowTaillessIcon, ArrowDirection } from '../../../../component/icon/ArrowTaillessIcon';
import { TagPicker } from '../../../note-editor/components/tag-picker/TagPicker';
import { i18nGet } from '../../../../localisation/Translate';
import { PopupHeader } from '../../../../component/popup/PopupHeader';
import { TagsIcon } from '../../../../component/icon/TagsIcon';
import { Checkbox } from '../../../../component/checkbox/Checkbox';
import { StyledButton, StyledButtonType } from '../../../../component/button/StyledButton';
import { IStorage } from '../../../../model/IStorage';
import { INoteFilter } from '../../../../model/INoteFilter';
import { createChangeNoteFilter } from '../../../../store/modules/note-filter/noteFilter';

const VALUES = {
  comment: 'withCommentsChecked',
  tags: 'withTagsChecked',
  highG: 'highGlucoseChecked',
  lowG: 'lowGlucoseChecked',
  normG: 'normalGlucoseChecked',
}

interface Props {
  noteFilter: INoteFilter
  isOpen: boolean
  onHide: () => void
  goToTagEditor: () => void
  applyFilter: (filter: INoteFilter) => void
};

class FilterPopup extends React.Component<Props> {
  state = {
    tags: this.props.noteFilter.tags || [],
    withCommentsChecked: this.props.noteFilter.withComment,
    withTagsChecked: this.props.noteFilter.withTags,
    highGlucoseChecked: this.props.noteFilter.highGlucose,
    lowGlucoseChecked: this.props.noteFilter.lowGlucose,
    normalGlucoseChecked: this.props.noteFilter.normalGlucose,
  };

  selectTag = (tagId: number) => {
    this.setState({
      tags: [
        ...this.state.tags,
        tagId
      ]
    })
  }

  unSelectTag = (tagId: number) => {
    const { tags } = this.state;

    const newTags = tags.filter(id => id !== tagId);

    this.setState({
      tags: newTags
    })
  }

  onCheck = (value: string) => {
    const prev = this.state[value];
    this.setState({
      [value]: !prev
    });
  }

  onApply = () => {
    const {
      tags, withCommentsChecked, withTagsChecked,
      highGlucoseChecked, lowGlucoseChecked, normalGlucoseChecked,
    } = this.state;
    const { applyFilter, onHide } = this.props;

    applyFilter({
      tags,
      withComment: withCommentsChecked,
      withTags: withTagsChecked,
      highGlucose: highGlucoseChecked,
      lowGlucose: lowGlucoseChecked,
      normalGlucose: normalGlucoseChecked,
    })

    onHide();
  }

  onClear = () => {
    const { applyFilter } = this.props;

    this.setState({
      tags: [],
      withCommentsChecked: false,
      withTagsChecked: false,
      highGlucoseChecked: false,
      lowGlucoseChecked: false,
      normalGlucoseChecked: false,
    });

    applyFilter({
      tags: null,
      withComment: false,
      withTags: false,
      highGlucose: false,
      lowGlucose: false,
      normalGlucose: false,
    })
  }

  render() {
    const { isOpen, onHide, goToTagEditor } = this.props;
    const {
      tags, withCommentsChecked, withTagsChecked,
      highGlucoseChecked, lowGlucoseChecked, normalGlucoseChecked,
    } = this.state;

    return (
      <SuperPopup
        hidden={!isOpen}
        direction={PopupDirection.BOTTOM_TOP}
      >
        <ScrollView style={styles.popupContent}>
          <PopupHeader
            rightSlot={
              <TouchableOpacity
                style={styles.arrowDownIcon}
                onPress={onHide}
              >
                <ArrowTaillessIcon direction={ArrowDirection.DOWN} />
              </TouchableOpacity>
            }
            title={i18nGet('filter')}
          />
          <View style={styles.checkboxes}>
            <Checkbox
              label={i18nGet('with_high_glucose')}
              isChecked={highGlucoseChecked}
              onCheck={() => this.setState({ highGlucoseChecked: !highGlucoseChecked })}
            />
            <Checkbox
              label={i18nGet('with_low_glucose')}
              isChecked={lowGlucoseChecked}
              onCheck={() => this.setState({ lowGlucoseChecked: !lowGlucoseChecked })}
            />
            <Checkbox
              label={i18nGet('with_normal_glucose')}
              isChecked={normalGlucoseChecked}
              onCheck={() => this.setState({ normalGlucoseChecked: !normalGlucoseChecked })}
            />
            <Checkbox
              label={i18nGet('with_tags')}
              isChecked={withTagsChecked}
              onCheck={() => this.setState({ withTagsChecked: !withTagsChecked })}
            />
            <Checkbox
              label={i18nGet('with_comment')}
              isChecked={withCommentsChecked}
              onCheck={() => this.setState({ withCommentsChecked: !withCommentsChecked })}
              withoutMargin
            />
          </View>
          <View style={styles.sectionHeaderView}>
            <TouchableOpacity
              onPress={goToTagEditor}
              style={styles.sectionHeaderTouchable}
            >
              <TagsIcon />
            </TouchableOpacity>
            <Text style={styles.sectionHeader}>
              {i18nGet('tags')}
            </Text>
          </View>
          {tags.length > 0 && (
            <View style={styles.selectedTags}>
              <TagPicker
                viewerOfSelected
                selectedTags={tags}
                onTagPress={this.unSelectTag}
                padding={8}
              />
            </View>
          )}
          <TagPicker
            selectedTags={tags}
            onTagPress={this.selectTag}
          />
          <View style={styles.buttons}>
            <StyledButton
              fluid
              label={i18nGet('clear')}
              style={StyledButtonType.OUTLINE}
              onPress={this.onClear}
            />
            <View style={styles.buttonDivider} />
            <StyledButton
              fluid
              label={i18nGet('apply')}
              style={StyledButtonType.PRIMARY}
              onPress={this.onApply}
            />
          </View>
        </ScrollView>
      </SuperPopup >
    );
  }
}

export const FilterPopupConnected = connect(
  (state: IStorage, ownProps) => ({
    noteFilter: state.noteFilter,
    ...ownProps
  }),
  (dispatch) => ({
    applyFilter: (filter: INoteFilter) => dispatch(createChangeNoteFilter(filter))
  })
)(FilterPopup);

const styles = StyleSheet.create({
  popupContent: {
    padding: 16,
    backgroundColor: COLOR.BLUE_BASE,
  },
  arrowDownIcon: {
    padding: 8,
  },
  sectionHeaderView: {
    marginTop: 16,
    marginBottom: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkboxes: {
    marginTop: 16,
  },
  sectionHeaderTouchable: {
    paddingRight: 8,
  },
  sectionHeader: {
    textAlignVertical: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  selectedTags: {
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.PRIMARY,
    padding: 8,
    paddingTop: 4,
    backgroundColor: COLOR.PRIMARY_WHITE
  },
  buttons: {
    marginTop: 16,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonDivider: {
    width: 8,
  },
})

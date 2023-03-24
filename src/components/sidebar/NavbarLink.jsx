import React, { useState } from 'react';
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
  rem,
} from '@mantine/core';
import { IconCalendarStats, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === 'dark' ? theme.colors.grey[2] : theme.black,
    fontSize: '24',
    // fontFamily: 'Noto Sans',
    fontWeight:"500",

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[4],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },
  icons: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(31),
    marginLeft: rem(30),
    fontSize: theme.fontSizes.lg,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    borderLeft: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.black
      }`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[4],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}));


export function LinksGroup({ icon: Icon, label, initiallyOpened, links, link }) {
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;
  const items = (hasLinks ? links : []).map((link) => (
    <NavLink to={link.link} className={classes.link} key={link.label}>
      {link.label}
    </NavLink>


  ));

  return (
    <>
      <NavLink to={link}>
  <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
    <Group position="apart" spacing={0}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ThemeIcon variant="light" size={30}>
          <Icon size="2rem" className={classes.icons}/>
        </ThemeIcon>
        <Box ml="md" style={{border:"none", }}>{label}</Box>
      </Box>          
      {hasLinks && (
        <ChevronIcon
          className={classes.chevron}
          size="1rem"
          stroke={1.5}
          style={{
            transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
          }}
        />
      )}
    </Group>
  </UnstyledButton>
</NavLink>


      {hasLinks ? <Collapse in={opened}>
        {items}</Collapse> : null}
    </>
  );
}

